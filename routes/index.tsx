import { Handlers, PageProps } from "$fresh/server.ts";
import { Translation, getPageOfVerses } from "@db";
import { batch, effect } from "@preact/signals";
import { escapeSql } from "escape";
import { useContext } from "preact/hooks";
import Carousel from "../islands/Carousel.tsx";
import NavBar from "../islands/NavBar.tsx";
import { API_PAGE_SIZE, APP_NAME, DEFAULT_ID, DEFAULT_TRANSLATION } from "../lib/constants.ts";
import { GlobalAppState } from "./_app.tsx";

type HomeProps = {
  cursor?: string;
  translation: Translation;
  vid: string;
  prevOffset?: string;
  nextOffset?: string;
  verses: Deno.KvEntry<string>[];
}

export const handler: Handlers = {
  async GET(req, ctx) {
    // get the search params
    const requestUrl = new URL(req.url);
    const searchParams = requestUrl.searchParams;
    const translation = escapeSql(searchParams.get("t") || DEFAULT_TRANSLATION);
    const vid = escapeSql(searchParams.get("vid") || `${DEFAULT_ID}`);

    // query the database
    const iter = getPageOfVerses(translation as Translation, parseInt(vid, 10), API_PAGE_SIZE);
    const verses: Deno.KvEntry<string>[] = [];
    for await (const verse of iter) {
      verses.push(verse);
    }
    return ctx.render({ translation, vid, verses });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  const { translation, vid, verses } = useContext(GlobalAppState);

  batch(() => {
    vid.value = parseInt(props.data.vid, 10);
    translation.value = props.data.translation;
  });

  effect(() => {
    verses.value = [...verses.peek(), ...props.data.verses];
  });

  return (
    <div
      class="no-interaction w-full h-full"
      role="application"
      id={APP_NAME}
      name={APP_NAME}
      aria-label={APP_NAME}
    >
      <div
        role="none"
        class="z-0 top-0 left-0 absolute overflow-hidden no-interaction w-full h-full"
      >
        <div
          role="none"
          id="container"
          class="relative no-interaction w-full h-full"
        >
          <main className="min-w-0 min-h-0 w-full h-full">
            <Carousel />
          </main>
          <nav className="min-w-0 min-h-0 w-full h-full">
            <NavBar />
          </nav>
        </div>
      </div>
    </div>
  );
}
