//deno-fmt-ignore-file

import type { Translation } from "@lib/types.ts";

export const APP_NAME = "HolyScroller" as const;
export const APP_VERSION = "0.0.1" as const;
export const APP_TAGLINE = "Scroll the scriptures!" as const;

export const HTML_LANG = "en" as const;
export const HTML_DIR = "ltr" as const;

export const META_CHARSET = "utf-8" as const;
export const META_DESCRIPTION = "Read the Bible for free in a TikTok style. Replace your social media with sacred media." as const;
export const META_VIEWPORT = "width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1, user-scalable=no" as const;
export const META_KEYWORDS = "bible, jesus, tiktok, social media, faith, answers, easy, beginner, christ, christianity" as const;
export const META_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" as const;
export const META_AUTHOR = "Peter Hughes - www.phugh.es" as const;
export const META_THEME_COLOR = "#09090b" as const;
export const META_COLOR_SCHEME = "dark" as const;

export const LINK_CANONICAL = "https://www.holyscroller.app" as const;

export const API_DEFAULT_ID = 1001001 as const;
export const API_DEFAULT_PAGE_SIZE = 29 as const;
export const API_DEFAULT_TRANSLATION: Translation = "kjv" as const;
export const API_MAX_ID = 66022021 as const;
export const API_MAX_PAGE_SIZE = 100 as const;
export const API_MIN_PAGE_SIZE = 1 as const;
export const API_MIN_ID = 1001001 as const;
export const API_MAX_BOOK_ID = 66 as const;
export const API_MIN_BOOK_ID = 1 as const;

export const DB_LOCAL_PATH = "./db/bible.db" as const;

export const PSALMS_START = 19001001 as const;
export const PSALMS_END = 19015006 as const;
export const PROVERBS_START = 20001001 as const;
export const PROVERBS_END = 20031031 as const;

export const enum KvPath {
  BOOKS = "books",
  CROSSREFS = "crossrefs",
  TRANSLATIONS = "translations",
}

export const NOOP_CURSOR = "-1" as const;

export const LS_KEY_ONBOARD = "hs-onboard" as const;

export const ROUTES_WHITELIST = Object.freeze([
  "api",
  "bible",
  "catechism",
  "lectionary",
  "partials",
]);

export const TRANSLATIONS = [
  { title: "The American Standard Version", value: "asv", flag: "🇺🇸", innerText: "ASV" },
  { title: "The Bible in Basic English", value: "bbe", flag: "🇬🇧", innerText: "BBE" },
  { title: "The King James Version", value: "kjv", flag: "🇬🇧", innerText: "KJV" },
  { title: "Chinese Union Version (traditional)", value: "cut", flag: "🇨🇳", innerText: "和合本 (Traditional)" },
] as const;
