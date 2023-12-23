import { Handlers, PageProps } from "$fresh/server.ts";
import { APP_NAME } from "@lib/constants.ts";
import { fetchWithParams, getApiParamsFromUrl } from "@lib/utils.ts";
import { batch, effect } from "@preact/signals";
import { useContext } from "preact/hooks";
import Carousel from "../islands/Carousel.tsx";
import NavBar from "../islands/NavBar.tsx";
import { GlobalAppState } from "./_app.tsx";

type HomeProps = {
  cursor?: string;
  translation: string;
  vid: string;
  verses: Deno.KvEntry<string>[];
};

export const handler: Handlers<HomeProps> = {
  async GET(req, ctx) {
    const { cursor, pageSize, translation, vid } = getApiParamsFromUrl(req.url);
    const url = new URL(req.url);
    const data = await fetchWithParams(url.origin, { cursor, pageSize, translation, vid });
    const { verses, cursor: newCursor } = await data.json();
    return ctx.render({ translation, vid, verses, cursor: newCursor });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  const { translation, vid, verses, cursor } = useContext(GlobalAppState);

  batch(() => {
    vid.value = parseInt(props.data.vid, 10);
    translation.value = props.data.translation as Translation;
    if (props.data.cursor) {
      cursor.value = props.data.cursor;
    }
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
