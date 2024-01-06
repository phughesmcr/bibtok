import { getPericope, getPericopesForBook } from "@data";
import {
  API_DEFAULT_ID,
  API_DEFAULT_PAGE_SIZE,
  API_MAX_ID,
  API_MAX_PAGE_SIZE,
  API_MIN_ID,
  API_MIN_PAGE_SIZE,
  LINK_CANONICAL,
} from "@lib/constants.ts";
import { clamp, getApiParamsFromUrl, setParamsWithoutReload } from "@lib/utils.ts";
import { computed, effect, signal } from "@preact/signals";

// URL based state

export const $currentUrl = signal<URL>(new URL(LINK_CANONICAL));

export const $currentParams = computed(() => getApiParamsFromUrl($currentUrl.value));

effect(() => {
  try {
    const { window } = globalThis;
    if (window.location) setParamsWithoutReload($currentParams.value, $currentUrl.value);
  } catch (err) {
    console.error(err);
  }
});

export const $translation = computed(() => $currentParams.value.translation);

export const $pageSize = computed(() =>
  clamp($currentParams.value.pageSize, API_MIN_PAGE_SIZE, API_MAX_PAGE_SIZE) || API_DEFAULT_PAGE_SIZE
);

export const $startFrom = computed(() => {
  if (!$currentParams.value.startFrom) return;
  return clamp(
    parseInt($currentParams.value.startFrom?.toString() || API_DEFAULT_ID.toString(), 10),
    API_MIN_ID,
    API_MAX_ID,
  );
});

export const $endAt = computed(() => {
  if (!$currentParams.value.endAt) return;
  return clamp(
    parseInt($currentParams.value.endAt?.toString() || API_DEFAULT_ID.toString(), 10),
    API_MIN_ID,
    API_MAX_ID,
  );
});

export const $cursor = computed(() => $currentParams.value.cursor);

export const $currentBook = computed(() => {
  return parseInt($startFrom.value?.toString().slice(0, 2) || "01", 10);
});

export const $bookPericopes = computed(() => getPericopesForBook($currentBook.value));

export const $startPericope = computed(() => getPericope($startFrom.value || API_DEFAULT_ID));

export const $pericopeSelected = computed(() =>
  $bookPericopes.value?.findIndex((p) => p.t === $startPericope.value?.t) || 0
);

// internal signals

export const $isLoading = signal<boolean>(true);
export const $isOnboard = signal<boolean>(false);
