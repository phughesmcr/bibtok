import type { Handlers } from "$fresh/server.ts";

// TODO: actually implement this

export const handler: Handlers = {
  GET(req, _ctx) {
    const url = new URL(req.url);
    url.pathname = "/bible";
    return Response.redirect(url, 302);
  },
};
