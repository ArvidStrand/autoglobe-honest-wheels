/**
 * Klientside FINN-hjelpere. Ingen API-nøkkel her – all kommunikasjon med FINN
 * skjer via vårt eget backend-endepunkt (/api/public/finn/*).
 */

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

/** Brukes hvis nettstedet serveres statisk uten vårt backend-endepunkt. */
const FALLBACK_ORIGIN = "https://autoglobe-honest-wheels.lovable.app";

async function getJson(path: string) {
  try {
    const res = await fetch(path, { headers: { accept: "application/json" } });
    if (res.ok) return await res.json();
    if (res.status === 404 && typeof window !== "undefined") throw new Error("not_found_local");
    if (res.status === 404) return null;
  } catch {
    /* faller tilbake under */
  }
  const res = await fetch(`${FALLBACK_ORIGIN}${path}`, { headers: { accept: "application/json" } });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("finn_unavailable");
  }
  return res.json();
}

export async function fetchFinnListings(): Promise<FinnListing[]> {
  const data = await getJson("/api/public/finn/listings");
  return (data?.listings ?? []) as FinnListing[];
}

export async function fetchFinnListing(id: string): Promise<FinnListing | null> {
  const data = await getJson(`/api/public/finn/ad/${id}`);
  return (data?.listing ?? null) as FinnListing | null;
}

export function formatFinnPrice(value?: number) {
  if (typeof value !== "number") return "Pris på forespørsel";
  return `${new Intl.NumberFormat("nb-NO").format(value)} kr`;
}

export function formatFinnKm(value?: number) {
  if (typeof value !== "number") return undefined;
  return `${new Intl.NumberFormat("nb-NO").format(value)} km`;
}

/** FINN leverer beskrivelsen som HTML – vi viser den som ren tekst med avsnitt. */
export function finnDescriptionToParagraphs(html?: string): string[] {
  if (!html) return [];
  return html
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/\s*(p|div|li)\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .split(/\n{1,}/)
    .map((line) => line.trim())
    .filter(Boolean);
}
