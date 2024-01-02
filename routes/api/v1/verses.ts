import { Handlers } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { getApiParamsFromUrl, getIdFromKvEntry } from "@lib/utils.ts";

// TODO: update this to include `next` and `extras`

export const handler: Handlers<ApiResponse | null> = {
  async GET(req, _ctx) {
    try {
      // fetch search params from url
      const params = getApiParamsFromUrl(req.url);
      const { cursor, pageSize, translation, startFrom, endAt } = params;

      // construct initial response
      const res: ApiResponse = { ...params, verses: [] };

      // query the database
      const iter = getPageOfVerses({
        translation,
        startFrom,
        endAt,
        pageSize,
        cursor,
      });

      // unroll the iterator
      for await (const verse of iter) {
        res.verses.push([getIdFromKvEntry(verse), verse.value]);
      }

      // update the cursor
      res.cursor = iter.cursor;

      // return the response as JSON
      return new Response(JSON.stringify(res), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error(err);
      // return error as JSON
      return new Response(null, {
        headers: { "content-type": "application/json" },
        status: 500,
      });
    }
  },
};
