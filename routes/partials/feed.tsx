import { Partial } from "$fresh/runtime.ts";
import { defineRoute, type RouteConfig } from "$fresh/server.ts";
import { getExtrasForVerses, getPageOfVerses } from "@db";
import type { Verse } from "@lib/types.ts";
import { createPartialFeedUrls, getApiParamsFromUrl, getIdFromKvEntry } from "@lib/utils.ts";
import Carousel from "../../islands/Carousel.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (req, ctx) => {
  try {
    const currentUrl = new URL(req.url);
    const params = getApiParamsFromUrl(req.url);
    const iter = await getPageOfVerses(params);
    const verses: Verse[] = [];
    for await (const verse of iter) {
      verses.push([getIdFromKvEntry(verse), verse.value]);
    }
    const next = {
      ...createPartialFeedUrls(currentUrl, { ...params, cursor: iter.cursor }),
      cursor: iter.cursor,
    };
    const extras = await getExtrasForVerses(verses);
    const data = { ...params, verses, extras, next };
    return (
      <Partial name="carousel">
        <Carousel res={data} next={next} extras={extras} />
      </Partial>
    );
  } catch (err) {
    console.error(err);
    return ctx.renderNotFound();
  }
});
