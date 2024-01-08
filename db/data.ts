import type { Pericope, VerseId } from "@lib/types.ts";
import { getRefFromId } from "@lib/utils.ts";
import BOOK_INFO from "./book_info.json" assert { type: "json" };
import BOOK_TITLES from "./book_titles.json" assert { type: "json" };
import PERICOPES from "./pericopes.json" assert { type: "json" };

export const getBookInfoById = (id: number) => {
  return BOOK_INFO.find((info) => info.order === id);
};

export const listOfBooks: [api: string, short: string][] = BOOK_INFO.map(({ title_short }) => {
  return [title_short.replaceAll(/[^a-zA-Z0-9]/g, ""), title_short];
});

export const getMaxChapterNo = (id: number): number | undefined => {
  return getBookInfoById(id)?.chapters;
};

export function getBookIdFromTitle(title: string): number | undefined {
  const norm = title.replace(/\s+/g, "");
  const pattern = new RegExp(`^${norm}$`, "gi");
  const book = Object.entries(BOOK_TITLES).filter(([_id, t]) => {
    if (t.some((t) => pattern.test(t))) return true;
    return false;
  })[0];
  if (!book || !book[0]) return undefined;
  return parseInt(book[0], 10);
}

export function getPericope(id: number): Pericope | undefined {
  return PERICOPES.find(({ r }) => r[0] <= id && r[1] >= id);
}

export function getPericopesForBook(book: number): Pericope[] {
  return PERICOPES.filter(({ r }) => {
    const [start] = r;
    const rBook = getRefFromId(start as VerseId)[0];
    return book === rBook;
  });
}
