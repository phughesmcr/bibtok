import { type PageProps } from "$fresh/server.ts";
import {
  APP_NAME,
  APP_TAGLINE,
  HTML_DIR,
  HTML_LANG,
  LINK_CANONICAL,
  META_AUTHOR,
  META_CHARSET,
  META_COLOR_SCHEME,
  META_DESCRIPTION,
  META_KEYWORDS,
  META_ROBOTS,
  META_THEME_COLOR,
  META_VIEWPORT,
} from "@lib/constants.ts";
import { type AppState, createAppState } from "@lib/state.ts";
import { createContext } from "preact";

export const GlobalAppState = createContext<AppState>({} as AppState);

export default function App({ Component }: PageProps) {
  return (
    <GlobalAppState.Provider value={createAppState()}>
      <html lang={HTML_LANG} dir={HTML_DIR}>
        <head>
          <meta charset={META_CHARSET} />
          <meta name="viewport" content={META_VIEWPORT} />
          <title>{APP_NAME} | {APP_TAGLINE}</title>
          <meta name="description" content={META_DESCRIPTION} />
          <meta name="keywords" content={META_KEYWORDS} />
          <meta name="robots" content={META_ROBOTS} />
          <meta name="author" content={META_AUTHOR} />

          <meta name="color-scheme" content={META_COLOR_SCHEME} />
          <meta name="theme-color" content={META_THEME_COLOR} />

          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={META_DESCRIPTION} />
          <meta property="og:url" content={LINK_CANONICAL} />
          <meta property="og:image" content={`${LINK_CANONICAL}/img/android-chrome-512x512.png`} />
          <meta property="og:image:secure_url" content={`${LINK_CANONICAL}/img/android-chrome-512x512.png`} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={META_DESCRIPTION} />
          <meta name="twitter:image:src" content={`${LINK_CANONICAL}/img/card.png`} />

          <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
          <link rel="canonical" href={LINK_CANONICAL} />
          <link rel="shortlink" href={LINK_CANONICAL.slice(12)} />

          <link rel="icon" href="img/android-chrome-48x48.png" sizes="48x48" type="image/png" />
          <link rel="apple-touch-icon" href="img/android-chrome-512x512.png" />
          <link rel="manifest" href="site.webmanifest" crossorigin="use-credentials" />

          <link rel="stylesheet" href="styles.css" />
        </head>
        <body class="no-interaction">
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Component />
        </body>
      </html>
    </GlobalAppState.Provider>
  );
}
