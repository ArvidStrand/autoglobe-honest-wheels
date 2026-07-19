import gl350 from "@/assets/gl350.asset.json";
import e200 from "@/assets/e200.asset.json";
import mazda6 from "@/assets/mazda6.asset.json";

export type Car = {
  id: string;
  brand: string;
  model: string;
  title: string;
  year: number;
  mileageKm: number;
  fuel: "Bensin" | "Diesel" | "Hybrid" | "Elektrisk";
  transmission: "Automat" | "Manuell";
  power: string;
  drivetrain: string;
  color: string;
  bodyType: string;
  priceNok: number;
  image: string;
  description: string;
  equipment: string[];
  specs: { label: string; value: string }[];
};

export const cars: Car[] = [
  {
    id: "mercedes-benz-gl350",
    brand: "Mercedes-Benz",
    model: "GL 350",
    title: "Mercedes-Benz GL 350 BlueTEC 4MATIC AMG-Line",
    year: 2014,
    mileageKm: 168000,
    fuel: "Diesel",
    transmission: "Automat",
    power: "258 hk",
    drivetrain: "4MATIC firehjulsdrift",
    color: "Cavansittblå metallic",
    bodyType: "SUV, 7-seter",
    priceNok: 289000,
    image: gl350.url,
    description:
      "En kompromissløs familie-SUV med plass til syv, kraftig V6 diesel og AMG-Line utstyrspakke. Bilen har full servicehistorikk, panoramatak, skinninteriør og luftfjæring. Perfekt for lange turer og familier med behov for komfort og trekkraft.",
    equipment: [
      "AMG-Line eksteriør",
      "Panoramatak",
      "Skinninteriør",
      "Luftfjæring (Airmatic)",
      "Adaptiv cruisekontroll",
      "Ryggekamera",
      "Navigasjon",
      "Elektriske seter med minne",
      "Harman Kardon lyd",
      "LED intelligent lys",
    ],
    specs: [
      { label: "Årsmodell", value: "2014" },
      { label: "Kilometerstand", value: "168 000 km" },
      { label: "Drivstoff", value: "Diesel" },
      { label: "Girkasse", value: "Automat (7G-Tronic)" },
      { label: "Effekt", value: "258 hk / 620 Nm" },
      { label: "Karosseri", value: "SUV, 7 seter" },
      { label: "Farge", value: "Cavansittblå metallic" },
      { label: "Hjuldrift", value: "4MATIC" },
    ],
  },
  {
    id: "mercedes-benz-e200",
    brand: "Mercedes-Benz",
    model: "E 200",
    title: "Mercedes-Benz E 200 CGI Coupé AMG-Line",
    year: 2012,
    mileageKm: 142500,
    fuel: "Bensin",
    transmission: "Automat",
    power: "184 hk",
    drivetrain: "Bakhjulsdrift",
    color: "Palladiumsølv metallic",
    bodyType: "Coupé",
    priceNok: 149000,
    image: e200.url,
    description:
      "Elegant E-Klasse Coupé med AMG utseendepakke, panoramatak og et lekkert interiør. Bilen er velholdt, har full servicehistorikk hos merkeforhandler og fremstår som helt strøken. En stilren og komfortabel bil med lave driftskostnader.",
    equipment: [
      "AMG-Line utseendepakke",
      "Panoramatak",
      "Skinninteriør",
      "Xenon adaptivt lys",
      "Navigasjon Comand",
      "Ryggesensor",
      "Cruisekontroll",
      "Elektriske sportsseter",
      "18\" AMG-felger",
      "Klimaanlegg 2-sone",
    ],
    specs: [
      { label: "Årsmodell", value: "2012" },
      { label: "Kilometerstand", value: "142 500 km" },
      { label: "Drivstoff", value: "Bensin" },
      { label: "Girkasse", value: "Automat" },
      { label: "Effekt", value: "184 hk" },
      { label: "Karosseri", value: "Coupé" },
      { label: "Farge", value: "Palladiumsølv metallic" },
      { label: "Hjuldrift", value: "Bakhjulsdrift" },
    ],
  },
  {
    id: "mazda-6",
    brand: "Mazda",
    model: "6 Sport Kombi",
    title: "Mazda 6 2.2 SkyActiv-D Optimum Sport Kombi",
    year: 2017,
    mileageKm: 118000,
    fuel: "Diesel",
    transmission: "Automat",
    power: "175 hk",
    drivetrain: "Forhjulsdrift",
    color: "Snowflake White Pearl",
    bodyType: "Stasjonsvogn",
    priceNok: 179000,
    image: mazda6.url,
    description:
      "Toppmodellen Optimum med skinninteriør, head-up display, Bose lydanlegg og full teknologipakke. En romslig og drivstoffgjerrig familiebil med lav egenvekt og sportslige kjøreegenskaper.",
    equipment: [
      "Skinninteriør (lys beige)",
      "Head-up display",
      "Bose premium lyd",
      "Adaptiv cruisekontroll",
      "Filholderassistent",
      "Ryggekamera",
      "Navigasjon",
      "Elektrisk bakluke",
      "Oppvarmet ratt og seter",
      "19\" alu-felger",
    ],
    specs: [
      { label: "Årsmodell", value: "2017" },
      { label: "Kilometerstand", value: "118 000 km" },
      { label: "Drivstoff", value: "Diesel" },
      { label: "Girkasse", value: "Automat" },
      { label: "Effekt", value: "175 hk / 420 Nm" },
      { label: "Karosseri", value: "Stasjonsvogn" },
      { label: "Farge", value: "Snowflake White Pearl" },
      { label: "Hjuldrift", value: "Forhjulsdrift" },
    ],
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("no-NO", { maximumFractionDigits: 0 }).format(n) + " kr";
export const formatKm = (n: number) =>
  new Intl.NumberFormat("no-NO", { maximumFractionDigits: 0 }).format(n) + " km";

export const getCar = (id: string) => cars.find((c) => c.id === id);
