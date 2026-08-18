/**
 * FINN API-integrasjon (server-side kun).
 * API-nøkkelen leses fra process.env['FINN_API_KEY'] og forlater aldri serveren.
 */

const FINN_BASE = "https://cache.api.finn.no/iad";
export const FINN_ORG_ID = "3895717";

export interface FinnListing {
  id: string;
  title: string;
  subtitle?: string;
  make?: string;
  model?: string;
  year?: string;
  mileageKm?: number;
  priceNok?: number;
  fuel?: string;
  transmission?: string;
  wheelDrive?: string;
  bodyType?: string;
  effectHk?: string;
  seats?: string;
  owners?: string;
  firstRegistration?: string;
  image?: string;
  images?: string[];
  description?: string;
  equipment?: string[];
  location?: string;
  finnUrl: string;
}

/* ---------------------------------- xml ---------------------------------- */

function decode(v: string) {
  return v
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function attrField(xml: string, name: string): string | undefined {
  const m = xml.match(new RegExp(`<finn:field name="${name}"\\s+value="([^"]*)"`));
  return m ? decode(m[1]!) : undefined;
}

function textField(xml: string, name: string): string | undefined {
  const m = xml.match(new RegExp(`<finn:field name="${name}"\\s*>([\\s\\S]*?)</finn:field>`));
  return m ? decode(m[1]!).trim() : undefined;
}

function valueList(xml: string, name: string): string[] {
  const block = xml.match(new RegExp(`<finn:field name="${name}"\\s*>([\\s\\S]*?)</finn:field>`));
  if (!block) return [];
  return [...block[1]!.matchAll(/<finn:value>([\s\S]*?)<\/finn:value>/g)].map((m) =>
    decode(m[1]!).trim(),
  );
}

function images(xml: string): string[] {
  return [...xml.matchAll(/<media:content[^>]*url="([^"]+)"[^>]*medium="image"/g)]
    .map((m) => decode(m[1]!))
    .filter((u) => u.includes("images.finncdn.no"));
}

function priceOf(xml: string, name: string): number | undefined {
  const m = xml.match(new RegExp(`<finn:price name="${name}"\\s+value="(\\d+)"`));
  return m ? Number(m[1]) : undefined;
}

function engineField(xml: string, name: string): string | undefined {
  const eng = xml.match(/<finn:field name="engine">([\s\S]*?)<\/finn:field>/);
  return eng ? attrField(eng[1]!, name) : undefined;
}

function parseEntry(xml: string): FinnListing | null {
  const id = xml.match(/<dc:identifier>(\d+)<\/dc:identifier>/)?.[1];
  if (!id) return null;
  const title = decode(xml.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").trim();
  const mileage = attrField(xml, "mileage");
  const imgs = images(xml);

  const listing: FinnListing = {
    id,
    title: title || [attrField(xml, "make"), attrField(xml, "model")].filter(Boolean).join(" "),
    finnUrl: `https://www.finn.no/${id}`,
  };
  const set = <K extends keyof FinnListing>(k: K, v: FinnListing[K] | undefined) => {
    if (v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)) listing[k] = v;
  };

  set("subtitle", textField(xml, "model_spec"));
  set("make", attrField(xml, "make"));
  set("model", attrField(xml, "model"));
  set("year", attrField(xml, "year"));
  set("mileageKm", mileage ? Number(mileage) : undefined);
  set("priceNok", priceOf(xml, "main"));
  set("fuel", engineField(xml, "fuel"));
  set("effectHk", engineField(xml, "effect"));
  set("transmission", attrField(xml, "transmission"));
  set("wheelDrive", attrField(xml, "wheel_drive"));
  set("bodyType", attrField(xml, "registration_class"));
  set("seats", attrField(xml, "seats"));
  set("owners", attrField(xml, "owners"));
  set("firstRegistration", attrField(xml, "first_registration"));
  set("image", imgs[0]);
  set("images", imgs);
  set("location", decode(xml.match(/<finn:city>([\s\S]*?)<\/finn:city>/)?.[1] ?? "").trim());
  set("description", textField(xml, "description"));
  set("equipment", valueList(xml, "equipment"));

  return listing;
}

/* --------------------------------- fetch --------------------------------- */

async function finnFetch(path: string): Promise<string> {
  const apiKey = process.env["FINN_API_KEY"];
  if (!apiKey) throw new Error("finn_not_configured");
  const res = await fetch(`${FINN_BASE}${path}`, {
    headers: { "X-FINN-apikey": apiKey },
  });
  if (!res.ok) throw new Error(`finn_http_${res.status}`);
  return res.text();
}

/* --------------------------------- cache --------------------------------- */

const TTL_MS = 10 * 60 * 1000;
type CacheEntry<T> = { at: number; value: T };
const cache = new Map<string, CacheEntry<unknown>>();

async function cached<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const hit = cache.get(key) as CacheEntry<T> | undefined;
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;
  try {
    const value = await loader();
    cache.set(key, { at: Date.now(), value });
    return value;
  } catch (err) {
    if (hit) return hit.value; // serve stale rather than fail
    throw err;
  }
}

/* ---------------------------------- api ----------------------------------- */

export async function getFinnListings(): Promise<FinnListing[]> {
  return cached("listings", async () => {
    const xml = await finnFetch(`/search/car-norway?orgId=${FINN_ORG_ID}&rows=100`);
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map((m) => parseEntry(m[1]!))
      .filter((l): l is FinnListing => {
        if (!l) return false;
        return true;
      })
      .filter((l) => !isSold(xml, l.id));
  });
}

function isSold(feedXml: string, id: string) {
  const entry = feedXml
    .split("<entry>")
    .find((e) => e.includes(`<dc:identifier>${id}</dc:identifier>`));
  return entry ? /urn:finn:ad:disposed"[^>]*term="true"/.test(entry) : false;
}

export async function getFinnListing(id: string): Promise<FinnListing | null> {
  if (!/^\d+$/.test(id)) return null;
  return cached(`ad:${id}`, async () => {
    let xml: string;
    try {
      xml = await finnFetch(`/ad/car-used-sale/${id}`);
    } catch {
      return null;
    }
    if (!/urn:finn:ad:status"[^>]*term="activated"/.test(xml)) return null;
    return parseEntry(xml);
  });
}
