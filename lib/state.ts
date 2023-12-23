import { type Signal, signal } from "@preact/signals";
import { API_DEFAULT_ID, API_DEFAULT_PAGE_SIZE, API_DEFAULT_TRANSLATION } from "./constants.ts";

export type AppState = {
  cursor: Signal<string | undefined>;
  pageSize: Signal<number>;
  translation: Signal<Translation>;
  vid: Signal<number>;
  verses: Signal<Deno.KvEntry<string>[]>;
};

export function createAppState(): AppState {
  const cursor = signal<string | undefined>(undefined);
  const pageSize = signal<number>(API_DEFAULT_PAGE_SIZE);
  const translation = signal<Translation>(API_DEFAULT_TRANSLATION);
  const vid = signal<number>(API_DEFAULT_ID);
  const verses = signal<Deno.KvEntry<string>[]>([]);

  return {
    cursor,
    pageSize,
    translation,
    vid,
    verses,
  };
}
