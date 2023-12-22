import { getBookInfo } from "@db";

export function toHexColorFormat(book: number, chapter: number, verse: number): string {
  const hexBook = book.toString(16).padStart(2, "0").toUpperCase();
  const hexChapter = chapter.toString(16).padStart(2, "0").toUpperCase();
  const hexVerse = verse.toString(16).padStart(2, "0").toUpperCase();
  return `#${hexBook}${hexChapter}${hexVerse}`;
}

export function fromHexColorFormat(hexColorString: string): [number, number, number] {
  const hexBook = parseInt(hexColorString.substring(1, 3), 16);
  const hexChapter = parseInt(hexColorString.substring(3, 5), 16);
  const hexVerse = parseInt(hexColorString.substring(5, 7), 16);
  return [hexBook, hexChapter, hexVerse];
}

export function bibleToId(book: number, chapter: number, verse: number): number {
  // BBCCCVVV
  const bookStr = book.toString().padStart(2, "0");
  const chapterStr = chapter.toString().padStart(3, "0");
  const verseStr = verse.toString().padStart(3, "0");
  return parseInt(`${bookStr}${chapterStr}${verseStr}`, 10);
}

export function bibleFromUrl(url: string): number {
  const params = new URLSearchParams(url);
  const id = params.get("id");
  if (id) {
    return parseInt(id.substring(0, 9), 10);
  }

  const book = params.get("book");
  const chapter = params.get("chapter");
  const verse = params.get("verse");
  if (book && chapter && verse) {
    return bibleToId(parseInt(book, 10), parseInt(chapter, 10), parseInt(verse, 10));
  }

  return 0;
}

export const memoizeWithLimitedHistory = <T extends (...args: any[]) => void>(fn: T, limit = 1) => {
  const cache: Record<string, any> = {};
  const keys: string[] = [];

  return (...args: any[]) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = fn(...args);
      cache[key] = result;
      keys.push(key);

      while (keys.length > limit) {
        delete cache[keys.shift()!];
      }

      return result;
    }
  };
};

export const unrollKvList = async <T>(generator: Deno.KvListIterator<T>): Promise<Deno.KvEntry<T>[]> => {
  const result = [];
  for await (const value of generator) {
    result.push(value);
  }
  return result;
}

// all this should be memoized

export const getIdFromKvEntry = <T>(entry: Deno.KvEntry<T>): number => {
  const id = entry.key[entry.key.length - 1];
  return parseInt(id.toString(), 10);
};

export const getLastIdFromKvList = <T>(entries: Deno.KvEntry<T>[]): number => {
  const lastEntry = entries[entries.length - 1];
  return getIdFromKvEntry(lastEntry);
};

export const getHighestIdFromKvList = <T>(entries: Deno.KvEntry<T>[]): number => {
  const sorted = entries.toSorted((a, b) => getIdFromKvEntry(a) - getIdFromKvEntry(b));
  const highestEntry = sorted[sorted.length - 1];
  return getIdFromKvEntry(highestEntry);
};

export const getLowestIdFromKvList = <T>(entries: Deno.KvEntry<T>[]): number => {
  const sorted = entries.toSorted((a, b) => getIdFromKvEntry(a) - getIdFromKvEntry(b));
  const lowestEntry = sorted[0];
  return getIdFromKvEntry(lowestEntry);
};

export const getDataFromId = (id: number): [b: number, c: number, v: number] => {
  // BCCCVVV or BBCCCVVV
  const idStr = id.toString().padStart(8, "0");
  const book = parseInt(idStr.substring(0, 2), 10);
  const chapter = parseInt(idStr.substring(2, 5), 10);
  const verse = parseInt(idStr.substring(5, 8), 10);
  return [book, chapter, verse];
};

export const getBookInfoFromId = (id: number) => {
  const [book] = getDataFromId(id);
  return getBookInfo(book);
};
