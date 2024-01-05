import { Partial } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import AppContainer from "@components/AppContainer.tsx";
import NavBar from "@components/NavBar.tsx";
import { getExtrasForVerses, getPageOfVerses } from "@db";
import Carousel from "@islands/Carousel.tsx";
import Toolbar from "@islands/Toolbar.tsx";
import type { ApiResponse, Verse } from "@lib/types.ts";
import { createPartialFeedUrls, getApiParamsFromUrl, getIdFromKvEntry } from "@lib/utils.ts";

export const handler: Handlers<ApiResponse> = {
  async GET(req, ctx) {
    try {
      const currentUrl = new URL(req.url);
      const params = getApiParamsFromUrl(req.url);
      const iter = await getPageOfVerses(params);
      const verses: Verse[] = [];
      for await (const verse of iter) {
        verses.push([getIdFromKvEntry(verse), verse.value]);
      }
      const next = {
        ...createPartialFeedUrls(currentUrl, { ...params, cursor: iter.cursor }),
        cursor: iter.cursor,
      };
      const extras = await getExtrasForVerses(verses);
      return ctx.render({ ...params, verses, extras, next, origin: currentUrl });
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound();
    }
  },
};

export default function Bible(props: PageProps<ApiResponse>) {
  const { data } = props;
  const { extras, next } = data;

  return (
    <>
      <AppContainer>
        <main role="main" className="min-w-0 min-h-0 w-full h-full">
          <Toolbar url={props.url} />
          <Partial name="carousel">
            <Carousel res={data} next={next} extras={extras} />
          </Partial>
        </main>
        <NavBar />
      </AppContainer>
    </>
  );
}
