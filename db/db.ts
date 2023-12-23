/// <reference lib="deno.unstable" />

import { API_DEFAULT_PAGE_SIZE, DB_PATH, KvPath } from "@lib/constants.ts";
import { escapeSql } from "escape";

const db = await Deno.openKv(DB_PATH);

globalThis.addEventListener("beforeunload", () => db?.close(), { passive: true });
globalThis.addEventListener("unload", () => db?.close(), { passive: true });
globalThis.addEventListener("unhandledrejection", () => db?.close(), { passive: true });

export const getBookInfoFromDb = (book: number): Promise<BookInfo | null> => {
  const cleanedId = parseInt(escapeSql(book.toString()), 10);
  return db.get<BookInfo>([KvPath.BOOKS, cleanedId]).then((res) => res.value);
};

export const getCrossRef = (id: number) => {
  const cleanedId = parseInt(escapeSql(id.toString()), 10);
  return db.get<CrossRef[]>([KvPath.CROSSREFS, cleanedId]).then((res) => res.value);
};

export const getVerse = (translation: Translation, id: number) => {
  const cleanedTranslation = escapeSql(translation);
  const cleanedId = parseInt(escapeSql(id.toString()), 10);
  return db.get<string>([KvPath.TRANSLATIONS, cleanedTranslation, cleanedId]).then((res) => res.value);
};

export const getPageOfVerses = (spec: PageSpec) => {
  const { translation, startFrom, endAt, pageSize, cursor } = spec;
  const cleanedTranslation = escapeSql(translation);
  const cleanedStartFrom = parseInt(escapeSql(startFrom.toString()), 10);
  const cleanedEndAt = endAt ? parseInt(escapeSql(endAt.toString()), 10) : undefined;
  const cleanedCursor = cursor ? escapeSql(cursor) : undefined;
  const cleanedPageSize = parseInt(escapeSql((pageSize || API_DEFAULT_PAGE_SIZE).toString()), 10);
  return db.list<string>({
    prefix: [KvPath.TRANSLATIONS, cleanedTranslation],
    start: [KvPath.TRANSLATIONS, cleanedTranslation, cleanedStartFrom],
    end: cleanedEndAt ? [KvPath.TRANSLATIONS, cleanedTranslation, cleanedEndAt] : undefined,
  }, { limit: cleanedPageSize, cursor: cleanedCursor });
};
