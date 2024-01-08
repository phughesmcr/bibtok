/// <reference lib="deno.unstable" />

import { API_DEFAULT_TRANSLATION, DB_LOCAL_PATH, KV_PATHS } from "@lib/constants.ts";
import type { ApiParams, BookInfo, CrossRef, Translation, Verse, VerseExtras } from "@lib/types.ts";
import { cleanId, cleanParams } from "@lib/utils.ts";
import { escapeSql } from "escape";

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
const db = await Deno.openKv(isDenoDeploy ? undefined : DB_LOCAL_PATH);

globalThis.addEventListener("unload", () => db?.close(), { passive: true });
globalThis.addEventListener("unhandledrejection", () => db?.close(), { passive: true });

/**
 * @param idx The 1-based book index (e.g. 1 for Genesis, 2 for Exodus, etc.)
 */
export const getBookInfo = (idx: number): Promise<BookInfo | null> => {
  const cleanedId = cleanId(idx);
  if (!cleanedId) return Promise.reject();
  return db.get<BookInfo>([KV_PATHS.BOOKS, cleanedId]).then((res) => res.value);
};

/**
 * @param id The verse id (e.g. 1001001 for Genesis 1:1)
 */
export const getCrossRef = (id: number): Promise<CrossRef[] | null> => {
  const cleanedId = cleanId(id);
  if (!cleanedId) return Promise.reject();
  return db.get<CrossRef[]>([KV_PATHS.CROSSREFS, cleanedId]).then((res) => res.value);
};

/**
 * @param id The verse id (e.g. 1001001 for Genesis 1:1)
 */
export const getVerse = (translation: Translation, id: number): Promise<string | null> => {
  const cleanedTranslation = escapeSql(translation);
  const cleanedId = cleanId(id);
  if (!cleanedId) return Promise.reject();
  return db.get<string>([KV_PATHS.TRANSLATIONS, cleanedTranslation, cleanedId]).then((res) => res.value);
};

export const getPageOfVerses = (params: ApiParams) => {
  const { translation, startFrom, endAt, pageSize, cursor } = cleanParams(params);
  const basePath: Deno.KvKey = [KV_PATHS.TRANSLATIONS, translation];
  const start: Deno.KvKey | undefined = startFrom ? [...basePath, startFrom] : undefined;
  const end: Deno.KvKey | undefined = endAt ? [...basePath, endAt] : undefined;
  const prefix: Deno.KvKey | undefined = (start && end) ? undefined : [KV_PATHS.TRANSLATIONS, translation];
  // @ts-ignore: undefined is fine for now (TODO)
  return db.list<string>({ prefix, start, end }, { limit: pageSize, cursor: cursor });
};

export const getExtrasForVerses = async (verses: Verse[], _t = API_DEFAULT_TRANSLATION): Promise<VerseExtras> => {
  const res: VerseExtras = { books: {}, crossRefs: {} };

  const books = [...new Set(verses.map(([id, _text]) => parseInt(id.toString().padStart(8, "0").substring(0, 2), 10)))];
  for (const book of books) {
    const cleanedBook = parseInt(book.toString(), 10);
    // if (!cleanedBook) continue;
    // TODO: internationalisation support
    const info = await db.get<BookInfo>([KV_PATHS.BOOKS, cleanedBook]).then((res) => res.value);
    if (info) res.books[cleanedBook] = info;
  }

  /* for (const [id, _text] of verses) {
    const cleanedId = cleanId(id);
    const refs = await db.get<CrossRef[]>([KvPath.CROSSREFS, cleanedId]).then((res) => res.value);
    if (refs) {
      refs.sort((a, b) => a[2] - b[2]);
      const finalCrossRefs = [];
      for (const ref of refs) {
        const [sv, ev] = ref;
        const refVerse = await db.list<string>({
          start: [KvPath.TRANSLATIONS, t, sv],
          end: [KvPath.TRANSLATIONS, t, ev],
        });
        for await (const a of refVerse) {
          finalCrossRefs.push(a);
        }
      }
      res.crossRefs[cleanedId] = finalCrossRefs;
    }
  } */

  return res;
};
