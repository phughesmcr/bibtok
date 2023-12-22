/// <reference lib="deno.unstable" />

export type Translation = "asv" | "bbe" | "kjv" | "web";

export type BookInfo = {
  abbreviation: string;
  category: string;
  chapters: number;
  order: number;
  otnt: "OT" | "NT";
  title_full: string;
  title_short: string;
}

export type CrossRef = [sv: number, ev: number, r: number];

const db = await Deno.openKv("./db/bible.db");

export const getBookInfo = (book: number) => db.get<BookInfo>(["books", book]).then(res => res.value);

export const getCrossRef = (id: number) => db.get<CrossRef[]>(["crossrefs", id]).then(res => res.value);

export const getVerse = (translation: Translation, id: number) => db.get<string>(["translations", translation, id]).then(res => res.value);

export async function* getPageOfVerses(translation: Translation, startFrom: number, pageSize: number, cursor?: string) {
  const iter = db.list<string>({ prefix: ["translations", translation], start: ["translations", translation, startFrom] }, { limit: pageSize, cursor });
  for await (const value of iter) {
    yield value;
  }
};

globalThis.addEventListener("unload", () => db.close(), { passive: true });
globalThis.addEventListener("unhandledrejection", () => db.close(), { passive: true });

export default db;
