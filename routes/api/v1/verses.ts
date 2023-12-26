import { Handlers } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { getApiParamsFromUrl, getIdFromKvEntry } from "@lib/utils.ts";

export const handler: Handlers<ApiResponse | null> = {
  async GET(req, _ctx) {
    // fetch search params from url
    const params = getApiParamsFromUrl(req.url);
    const { cursor, pageSize, translation, startFrom, endAt } = params;

    // query the database
    const iter = getPageOfVerses({
      translation,
      startFrom,
      endAt,
      pageSize,
      cursor,
    });

    // unroll the iterator
    const verses: Verse[] = [];
    for await (const verse of iter) {
      verses.push([getIdFromKvEntry(verse), verse.value]);
    }

    // construct the response
    const res: ApiResponse = {
      ...params,
      verses,
      cursor: iter.cursor,
    };

    // return the response as JSON
    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  },
};
