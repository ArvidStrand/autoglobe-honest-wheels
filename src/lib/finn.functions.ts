import { createServerFn } from "@tanstack/react-start";

export const getFinnAdFn = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => {
    const { getFinnListing } = await import("@/lib/finn.server");
    return await getFinnListing(data.id);
  });
