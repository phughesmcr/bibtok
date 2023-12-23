//deno-fmt-ignore-file

export const APP_NAME = "BibTok" as const;
export const APP_VERSION = "0.0.1" as const;
export const APP_TAGLINE = "Scroll the scriptures" as const;

export const HTML_LANG = "en" as const;
export const HTML_DIR = "ltr" as const;

export const META_CHARSET = "utf-8" as const;
export const META_DESCRIPTION = "Read the Bible for free in a TikTok style. Replace your social media with scriptural media." as const;
export const META_VIEWPORT = "width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1, user-scalable=no" as const;
export const META_KEYWORDS = "bible, jesus, tiktok, social media, faith, answers, easy, beginner" as const;
export const META_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" as const;
export const META_AUTHOR = "Peter Hughes - www.phugh.es" as const;
export const META_THEME_COLOR = "#000000" as const;
export const META_COLOR_SCHEME = "dark" as const;

export const LINK_CANONICAL = "https://www.phugh.es/bibtok" as const;

export const API_DEFAULT_ID = 1001001 as const;
export const API_DEFAULT_PAGE_SIZE = 25 as const;
export const API_DEFAULT_TABLE = "t_kjv" as const;
export const API_DEFAULT_TRANSLATION: Translation = "kjv" as const;
export const API_MAX_ID = 66022021 as const;
export const API_MAX_PAGE_SIZE = 100 as const;
export const API_MIN_ID = 1001001 as const;

// export const DB_PATH = "./db/bible.db" as const;
export const DB_PATH =  "https://api.deno.com/databases/def1c51f-5404-4974-91b9-1074422940ee/connect" as const;

export const enum KvPath {
  BOOKS = "books",
  CROSSREFS = "crossrefs",
  TRANSLATIONS = "translations",
}
