import { Handlers } from "$fresh/server.ts";
import { PROVERBS_END, PROVERBS_START } from "@lib/constants.ts";

const makeUrl = (url: URL) => {
  const res = new URL(url.origin);
  for (const [key, value] of url.searchParams.entries()) {
    res.searchParams.set(key, value);
  }
  res.searchParams.set("sv", PROVERBS_START.toString());
  res.searchParams.set("ev", (PROVERBS_END + 1).toString());
  return res;
};

export const handler: Handlers = {
  GET(req, ctx) {
    try {
      const url = new URL(req.url);
      const res = makeUrl(url);
      return Response.redirect(res.toString(), 307);
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound();
    }
  },
};
