import type { Handlers } from "$fresh/server.ts";

const _routes = [
  "api",
  "bible",
  "catechism",
  "lectionary",
  "partials",
];

export const handler: Handlers = {
  GET(req, ctx) {
    const id = ctx.params.id;
    if (!id || _routes.includes(id.toLowerCase().trim())) {
      return ctx.next();
    }
    const url = new URL(req.url);
    url.pathname = `/bible/${id}`;
    return Response.redirect(url, 302);
  },
};
