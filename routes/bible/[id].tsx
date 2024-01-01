import { Handlers } from "$fresh/server.ts";
import { getBookIdFromTitle } from "@data";
import { API_MAX_BOOK_ID, API_MAX_ID, API_MIN_BOOK_ID, API_MIN_ID } from "@lib/constants.ts";
import { escapeSql } from "escape";

export const handler: Handlers = {
  GET(req, ctx) {
    try {
      const { id } = ctx.params;
      const cleanId = escapeSql(id);

      // check if id is a book name...
      const bookId = getBookIdFromTitle(cleanId);
      if (bookId && !isNaN(bookId) && bookId >= API_MIN_BOOK_ID && bookId <= API_MAX_BOOK_ID) {
        const res = new URL(req.url);
        res.pathname = "/bible";
        res.searchParams.set("sv", `${bookId}001001`);
        res.searchParams.set("ev", `${bookId}999999`);
        return Response.redirect(res.toString(), 302);
      }
      // ... or a verse id
      const idInt = parseInt(cleanId, 10);
      if (!idInt || isNaN(idInt) || idInt < API_MIN_ID || idInt > API_MAX_ID) {
        return ctx.renderNotFound({ message: `Verse "${cleanId}" not found. Try again.` });
      }
      const res = new URL(req.url);
      res.pathname = "/bible";
      res.searchParams.set("sv", cleanId);
      res.searchParams.delete("ev");
      return Response.redirect(res.toString(), 302);
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound({ message: "Something went wrong. Try again." });
    }
  },
};
