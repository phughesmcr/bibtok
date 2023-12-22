import { type Translation } from "@db";
import { signal, type Signal } from "@preact/signals";
import { DEFAULT_ID, DEFAULT_TRANSLATION } from "./constants.ts";

export type AppState = {
  translation: Signal<Translation>;
  vid: Signal<number>;
  verses: Signal<Deno.KvEntry<string>[]>;
};

export default function createAppState(): AppState {
  const translation = signal<Translation>(DEFAULT_TRANSLATION);
  const vid = signal<number>(DEFAULT_ID);
  const verses = signal<Deno.KvEntry<string>[]>([]);

  return {
    translation,
    vid,
    verses,
  };
}
