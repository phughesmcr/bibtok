import { Partial } from "$fresh/runtime.ts";
import { defineRoute, type RouteConfig } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { getApiParamsFromUrl, getIdFromKvEntry, setApiParamsInUrl } from "@lib/utils.ts";
import Carousel from "../../islands/Carousel.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (req, ctx) => {
  const params = getApiParamsFromUrl(req.url);
  const iter = await getPageOfVerses(params);
  const verses: Verse[] = [];
  for await (const verse of iter) {
    verses.push([getIdFromKvEntry(verse), verse.value]);
  }
  const res = { ...params, verses, cursor: iter.cursor };
  const next = setApiParamsInUrl(new URL(req.url).origin, res);
  const fp = new URL(next);
  fp.pathname = "/partials/feed";
  return (
    <Partial name="carousel">
      <Carousel res={res} next={next} fp={fp} />
    </Partial>
  );
});
