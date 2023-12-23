import { Handlers } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { API_MAX_PAGE_SIZE } from "@lib/constants.ts";
import { clamp, getApiParamsFromUrl } from "@lib/utils.ts";

export const handler: Handlers<Verses | null> = {
  async GET(req, _ctx) {
    const { cursor, pageSize, translation, vid } = getApiParamsFromUrl(req.url);

    // query the database
    const iter = getPageOfVerses({
      translation: translation as Translation,
      startFrom: parseInt(vid, 10),
      pageSize: clamp(parseInt(pageSize, 10), 1, API_MAX_PAGE_SIZE),
      cursor,
    });

    const verses: Deno.KvEntry<string>[] = [];
    for await (const verse of iter) {
      verses.push(verse);
    }

    return new Response(JSON.stringify({ verses, cursor: iter.cursor, vid, translation, pageSize }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  },
};
