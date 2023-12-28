/// <reference lib="deno.unstable" />

import { API_DEFAULT_PAGE_SIZE, API_DEFAULT_TRANSLATION, KvPath } from "@lib/constants.ts";
import { escapeSql } from "escape";

const db = await Deno.openKv();

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

export const getPageOfVerses = (params: ApiParams) => {
  const { translation, startFrom, endAt, pageSize, cursor } = params;
  const cleanedTranslation = translation ? escapeSql(translation) : API_DEFAULT_TRANSLATION;
  const cleanedPageSize = parseInt(escapeSql((pageSize || API_DEFAULT_PAGE_SIZE).toString()), 10);
  const cleanedStartFrom = startFrom ? parseInt(escapeSql(startFrom.toString()), 10) : undefined;
  const cleanedEndAt = endAt ? parseInt(escapeSql(endAt.toString()), 10) : undefined;
  const cleanedCursor = cursor ? escapeSql(cursor) : undefined;

  const basePath: Deno.KvKey = [KvPath.TRANSLATIONS, cleanedTranslation];
  const start: Deno.KvKey | undefined = cleanedStartFrom ? [...basePath, cleanedStartFrom] : undefined;
  const end: Deno.KvKey | undefined = cleanedEndAt ? [...basePath, cleanedEndAt] : undefined;
  const prefix: Deno.KvKey | undefined = (start && end) ? undefined : [KvPath.TRANSLATIONS, cleanedTranslation];

  // @ts-ignore
  return db.list<string>({ prefix, start, end }, { limit: cleanedPageSize, cursor: cleanedCursor });
};
