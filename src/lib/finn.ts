/**
 * FINN-integrasjon (placeholder)
 * ------------------------------------------------------------------
 * Når API-nøkkelen fra FINN er på plass, hentes annonsene her i stedet
 * for det lokale utvalget. Strukturen under er den samme som kortene
 * i annonselisten forventer, slik at kun denne filen må endres.
 */

export interface FinnListing {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  year?: string;
  km?: string;
  fuel?: string;
  gearbox?: string;
  image?: string;
  url?: string;
}

export const FINN_ENABLED = false;

/** Kobles på FINN API når nøkkelen er lagt inn. */
export async function fetchFinnListings(): Promise<FinnListing[]> {
  return [];
}
