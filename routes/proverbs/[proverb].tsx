import { Handlers } from "$fresh/server.ts";
import { PROVERBS_END, PROVERBS_START } from "@lib/constants.ts";

const makeUrl = (url: URL, sv?: number, ev?: number) => {
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
      const lastPart = url.pathname.split("/").pop();
      if (!lastPart) {
        const res = makeUrl(url);
        return Response.redirect(res.toString(), 307);
      }
      let psalm = parseInt(lastPart, 10);
      if (psalm === 151) psalm = 150;
      if (isNaN(psalm) || psalm < 1 || psalm > 150) {
        return ctx.renderNotFound();
      }
      const psalmStr = psalm.toString().padStart(3, "0");
      const res = makeUrl(url);
      res.searchParams.set("sv", `20${psalmStr}001`);
      res.searchParams.set("ev", `20${psalmStr}999`);
      return Response.redirect(res.toString(), 307);
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound();
    }
  },
};
