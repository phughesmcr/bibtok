export type Opaque<T, K> = T & { __TYPE__: K };

export type VerseRef = Opaque<number, "VerseRef">;

export type Translation = "asv" | "bbe" | "cut" | "kjv" | "web";

export type Pericope = {
  sv: number;
  ev: number;
  o: number;
  t: string;
  r: number[];
};

export type BookInfo = {
  abbreviation: string;
  category: string;
  chapters: number;
  order: number;
  otnt: string;
  title_full: string;
  title_short: string;
};

export type CrossRef = [sv: number, ev: number, r: number];

export type Verse = [id: number, text: string];

export type BibleKvData = {
  books: BookInfo[];
  crossrefs: CrossRef[];
  translations: Record<Translation, Record<VerseRef, string>>;
};

export type ApiParams = {
  translation: Translation;
  startFrom?: number;
  endAt?: number;
  pageSize: number;
  cursor?: string;
};

export type VerseExtras = {
  books: Record<number, BookInfo>;
  crossRefs: Record<number, CrossRef[]>;
};

export type VerseNextPageParams = {
  cursor: string;
  url: URL;
  fp: URL;
};

export type ApiResponse = ApiParams & {
  origin: URL | string;
  verses: Verse[];
  extras?: VerseExtras;
  next?: VerseNextPageParams;
};
