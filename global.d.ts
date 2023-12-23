declare type Opaque<T, K> = T & { __TYPE__: K };

declare type VerseRef = Opaque<number, "VerseRef">;

declare type Translation = "asv" | "bbe" | "kjv" | "web";

declare type Pericope = {
  sv: number;
  ev: number;
  o: number;
  t: string;
  r: number[];
};

declare type BookInfo = {
  abbreviation: string;
  category: string;
  chapters: number;
  order: number;
  otnt: string;
  title_full: string;
  title_short: string;
};

declare type CrossRef = [sv: number, ev: number, r: number];

declare type ApiParams = {
  translation: string;
  vid: string;
  pageSize: string;
  cursor?: string;
};

declare type Verses = {
  verses: Deno.KvEntry<string>[];
  cursor: string | undefined;
  vid: string;
  translation: string;
  pageSize: string;
};

declare type PageSpec = {
  translation: Translation;
  startFrom: number;
  endAt?: number;
  pageSize?: number;
  cursor?: string;
};
