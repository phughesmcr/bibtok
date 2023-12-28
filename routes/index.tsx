import { Partial } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { getApiParamsFromUrl, getIdFromKvEntry, setApiParamsInUrl } from "@lib/utils.ts";
import AppContainer from "../components/AppContainer.tsx";
import Carousel from "../islands/Carousel.tsx";
import NavBar from "../islands/NavBar.tsx";

export const handler: Handlers<ApiResponse> = {
  async GET(req, ctx) {
    try {
      const params = getApiParamsFromUrl(req.url);
      const iter = await getPageOfVerses(params);
      const verses: Verse[] = [];
      for await (const verse of iter) {
        verses.push([getIdFromKvEntry(verse), verse.value]);
      }
      return ctx.render({ ...params, verses, cursor: iter.cursor });
    } catch (err) {
      console.error(err);
      return ctx.renderNotFound();
    }
  },
};

export default function Home(props: PageProps<ApiResponse>) {
  const { data } = props;

  const nextUrl = setApiParamsInUrl(new URL(props.url), data);

  return (
    <AppContainer>
      <main role="main" className="min-w-0 min-h-0 w-full h-full">
        <Partial name="carousel">
          <Carousel res={data} next={nextUrl} />
        </Partial>
      </main>
      <nav role="navigation" className="min-w-0 min-h-0 w-full h-full">
        <NavBar />
      </nav>
    </AppContainer>
  );
}
