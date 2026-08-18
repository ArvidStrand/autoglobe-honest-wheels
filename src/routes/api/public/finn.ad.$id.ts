import { createFileRoute } from "@tanstack/react-router";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const Route = createFileRoute("/api/public/finn/ad/$id")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      GET: async ({ params }) => {
        const id = String(params.id ?? "");
        if (!/^\d{1,15}$/.test(id)) {
          return new Response(JSON.stringify({ ok: false }), {
            status: 400,
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        }
        try {
          const { getFinnListing } = await import("@/lib/finn.server");
          const listing = await getFinnListing(id);
          if (!listing) {
            return new Response(JSON.stringify({ ok: false }), {
              status: 404,
              headers: { "content-type": "application/json", ...corsHeaders },
            });
          }
          return new Response(JSON.stringify({ ok: true, listing }), {
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=300, s-maxage=600",
              ...corsHeaders,
            },
          });
        } catch (err) {
          console.error("[finn] ad failed:", (err as Error).message);
          return new Response(JSON.stringify({ ok: false }), {
            status: 502,
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        }
      },
    },
  },
});
