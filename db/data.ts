import { refFromId } from "@lib/utils.ts";
import BOOK_INFO from "./book_info.json" assert { type: "json" };
import BOOK_TITLES from "./book_titles.json" assert { type: "json" };
import PERICOPES from "./pericopes.json" assert { type: "json" };

export function getBookInfo(book: number): BookInfo | undefined {
  return BOOK_INFO.find(({ order }) => order === book);
}

export function getBookInfoFromId(id: number): BookInfo | undefined {
  const [book] = refFromId(id);
  return getBookInfo(book);
}

export function getBookIdFromTitle(title: string): number {
  const norm = title.replace(/\s+/g, "");
  const pattern = new RegExp(`^${norm}$`, "i");
  const id = Object.entries(BOOK_TITLES).filter(([_id, t]) => {
    if (t.some((t) => pattern.test(t))) return true;
    return false;
  })[0][0];
  return parseInt(id, 10);
}

let cache: Record<number, Pericope | undefined> = {};

export function getPericope(id: number): Pericope | undefined {
  if (Object.keys(cache).length > 250) {
    cache = {};
  }
  if (id in cache) {
    return cache[id];
  } else {
    const result = PERICOPES.find(({ r }) => r[0] <= id && r[1] >= id);
    cache[id] = result;
    return result;
  }
}
