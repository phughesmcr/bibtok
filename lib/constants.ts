//deno-fmt-ignore-file

import { Translation } from "@db";

export const APP_NAME = "BibTok" as const;
export const APP_VERSION = "0.0.1" as const;
export const APP_TAGLINE = "" as const;

export const HTML_LANG = "en" as const;
export const HTML_DIR = "ltr" as const;

export const META_CHARSET = "utf-8" as const;
export const META_DESCRIPTION = "" as const;
export const META_VIEWPORT = "width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1, user-scalable=no" as const;
export const META_KEYWORDS = "" as const;
export const META_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" as const;
export const META_AUTHOR = "Peter Hughes - www.phugh.es" as const;
export const META_THEME_COLOR = "#000000" as const;
export const META_COLOR_SCHEME = "dark" as const;

export const LINK_CANONICAL = "https://www.phugh.es/bibtok" as const;

export const LINK_GLOBAL_CSS = "./styles/global.css" as const;

export const API_DEFAULT_TABLE = "t_kjv" as const;
export const API_MIN_ID = 1001001 as const;
export const API_MAX_ID = 66022021 as const;
export const API_PAGE_SIZE = 25 as const;

export const DEFAULT_TRANSLATION: Translation = "kjv";
export const DEFAULT_ID = 1001001;
