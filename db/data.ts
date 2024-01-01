import BOOK_TITLES from "./book_titles.json" assert { type: "json" };
import PERICOPES from "./pericopes.json" assert { type: "json" };

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
