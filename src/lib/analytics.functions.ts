import { createServerFn } from "@tanstack/react-start";

// GA4 measurement IDs are public by nature (visible in page source),
// but we keep it in server env and expose it via this server function
// so the ID is never hardcoded in the client bundle.
export const getGaMeasurementId = createServerFn({ method: "GET" }).handler(
  async () => {
    return process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? null;
  },
);
