/// <reference lib="deno.unstable" />

import { API_DEFAULT_PAGE_SIZE, API_DEFAULT_TRANSLATION, KvPath } from "@lib/constants.ts";
import { cleanId } from "@lib/utils.ts";
import { escapeSql } from "escape";

const db = await Deno.openKv();

globalThis.addEventListener("unload", () => db?.close(), { passive: true });
globalThis.addEventListener("unhandledrejection", () => db?.close(), { passive: true });

export const getBookInfo = (id: number): Promise<BookInfo | null> => {
  const cleanedId = cleanId(id);
  return db.get<BookInfo>([KvPath.BOOKS, cleanedId]).then((res) => res.value);
};

export const getCrossRef = (id: number): Promise<CrossRef[] | null> => {
  const cleanedId = cleanId(id);
  return db.get<CrossRef[]>([KvPath.CROSSREFS, cleanedId]).then((res) => res.value);
};

export const getVerse = (translation: Translation, id: number): Promise<string | null> => {
  const cleanedTranslation = escapeSql(translation);
  const cleanedId = cleanId(id);
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

  // @ts-ignore: undefined is fine for now (TODO)
  return db.list<string>({ prefix, start, end }, { limit: cleanedPageSize, cursor: cleanedCursor });
};

export const getExtrasForVerses = async (verses: Verse[]): Promise<VerseExtras> => {
  const res: VerseExtras = { books: {}, crossRefs: {} };

  const books = [...new Set(verses.map(([id, _text]) => parseInt(id.toString().padStart(8, "0").substring(0, 2), 10)))];
  for (const book of books) {
    const cleanedBook = cleanId(book);
    // TODO: internationalisation support
    const info = await db.get<BookInfo>([KvPath.BOOKS, cleanedBook]).then((res) => res.value);
    if (info) res.books[cleanedBook] = info;
  }

  for (const [id, _text] of verses) {
    const cleanedId = cleanId(id);
    const refs = await db.get<CrossRef[]>([KvPath.CROSSREFS, cleanedId]).then((res) => res.value);
    if (refs) res.crossRefs[cleanedId] = refs;
  }

  return res;
};
