import {
  API_DEFAULT_PAGE_SIZE,
  API_DEFAULT_TRANSLATION,
  API_MAX_ID,
  API_MAX_PAGE_SIZE,
  API_MIN_ID,
  API_MIN_PAGE_SIZE,
  LINK_CANONICAL,
} from "@lib/constants.ts";
import { clamp } from "@lib/utils.ts";
import { computed, signal } from "@preact/signals";

// URL based state

export const $currentUrl = signal<URL>(new URL(LINK_CANONICAL));

export const $translation = computed(() => {
  return $currentUrl.value?.searchParams.get("t") || API_DEFAULT_TRANSLATION;
});

export const $pageSize = computed(() => {
  return clamp(
    parseInt($currentUrl.value?.searchParams.get("s") || `${API_DEFAULT_PAGE_SIZE}`, 10) || API_DEFAULT_PAGE_SIZE,
    API_MIN_PAGE_SIZE,
    API_MAX_PAGE_SIZE,
  );
});

export const $startFrom = computed(() => {
  const raw = $currentUrl.value?.searchParams.get("sv");
  if (!raw) return undefined;
  return clamp(parseInt(raw, 10), API_MIN_ID, API_MAX_ID);
});

export const $endAt = computed(() => {
  const raw = $currentUrl.value.searchParams.get("ev");
  if (!raw) return undefined;
  return clamp(parseInt(raw, 10), API_MIN_ID, API_MAX_ID);
});

export const $cursor = computed(() => {
  // TODO: validate cursor
  return $currentUrl.value.searchParams.get("c") || undefined;
});

// internal signals

export const $isLoading = signal<boolean>(true);
export const $isOnboard = signal<boolean>(false);
