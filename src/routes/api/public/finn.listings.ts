import { createFileRoute } from "@tanstack/react-router";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const Route = createFileRoute("/api/public/finn/listings")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      GET: async () => {
        try {
          const { getFinnListings } = await import("@/lib/finn.server");
          const listings = await getFinnListings();
          return new Response(JSON.stringify({ ok: true, listings }), {
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=300, s-maxage=600",
              ...corsHeaders,
            },
          });
        } catch (err) {
          console.error("[finn] listings failed:", (err as Error).message);
          return new Response(JSON.stringify({ ok: false, listings: [] }), {
            status: 502,
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        }
      },
    },
  },
});
