import { type Signal, signal } from "@preact/signals";
import { API_DEFAULT_ID, API_DEFAULT_PAGE_SIZE, API_DEFAULT_TRANSLATION } from "./constants.ts";

export type AppState = {
  cursor: Signal<string | undefined>;
  pageSize: Signal<number>;
  translation: Signal<Translation>;
  startFrom: Signal<number | undefined>;
  endAt: Signal<number | undefined>;
  verses: Signal<Verse[]>;
};

export function createAppState(): AppState {
  const cursor = signal<string | undefined>(undefined);
  const pageSize = signal<number>(API_DEFAULT_PAGE_SIZE);
  const translation = signal<Translation>(API_DEFAULT_TRANSLATION);
  const startFrom = signal<number>(API_DEFAULT_ID);
  const endAt = signal<number | undefined>(undefined);
  const verses = signal<Verse[]>([]);

  return {
    cursor,
    pageSize,
    translation,
    startFrom,
    endAt,
    verses,
  };
}
