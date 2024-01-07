import { getPericope, getPericopesForBook } from "@data";
import {
  API_DEFAULT_ID,
  API_DEFAULT_PAGE_SIZE,
  API_DEFAULT_TRANSLATION,
  API_MAX_ID,
  API_MAX_PAGE_SIZE,
  API_MIN_ID,
  API_MIN_PAGE_SIZE,
} from "@lib/constants.ts";
import type { ApiParams } from "@lib/types.ts";
import { clamp, getApiParamsFromUrl, refFromId, setParamsWithoutReload } from "@lib/utils.ts";
import { computed, effect, signal } from "@preact/signals";

// URL based state

export const $currentUrl = signal<URL | null>(null);

export const $currentParams = computed<ApiParams | null>(() =>
  $currentUrl.value ? getApiParamsFromUrl($currentUrl.value) : null
);

effect(() => {
  if (!$currentParams.value) return;
  try {
    const { window } = globalThis;
    if (window.location) setParamsWithoutReload($currentParams.value, $currentUrl.value!);
  } catch (err) {
    console.error(err);
  }
});

export const $translation = computed(() => $currentParams.value?.translation || API_DEFAULT_TRANSLATION);

export const $pageSize = computed(() =>
  clamp($currentParams.value?.pageSize || API_DEFAULT_PAGE_SIZE, API_MIN_PAGE_SIZE, API_MAX_PAGE_SIZE)
);

export const $startFrom = computed(() => {
  if (!$currentParams.value?.startFrom) return;
  return clamp(
    parseInt($currentParams.value.startFrom?.toString() || API_DEFAULT_ID.toString(), 10),
    API_MIN_ID,
    API_MAX_ID,
  );
});

export const $endAt = computed(() => {
  if (!$currentParams.value?.endAt) return;
  return clamp(
    parseInt($currentParams.value.endAt?.toString() || API_DEFAULT_ID.toString(), 10),
    API_MIN_ID,
    API_MAX_ID,
  );
});

export const $cursor = computed(() => $currentParams.value?.cursor);

// tracking current view

export const $currentVerse = signal<number>(API_DEFAULT_ID);

export const $currentRef = computed(() => refFromId($currentVerse.value));

export const $bookPericopes = computed(() => $currentRef.value[0] ? getPericopesForBook($currentRef.value[0]) : []);

export const $currentPericope = computed(() => $currentVerse.value ? getPericope($currentVerse.value) : undefined);

export const $currentPericopeIdx = computed(() =>
  $bookPericopes.value?.findIndex((p) => p.t === $currentPericope.value?.t)
);

// FAB
export const $showFab = signal<boolean>(true);
export const $fabUrl = signal<URL>(new URL("https://www.achurchnearyou.com/"));

// internal signals

export const $isLoading = signal<boolean>(true);
export const $isOnboard = signal<boolean>(false);
