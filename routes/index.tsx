import { Partial } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getPageOfVerses } from "@db";
import { getApiParamsFromUrl, getIdFromKvEntry, setApiParamsInUrl } from "@lib/utils.ts";
import AppContainer from "../components/AppContainer.tsx";
import NavBar from "../components/NavBar.tsx";
import Carousel from "../islands/Carousel.tsx";
import Onboarding from "../islands/Onboarding.tsx";
import Toolbar from "../islands/Toolbar.tsx";

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
  const { verses, cursor, endAt, pageSize, startFrom, translation } = data;

  const currentUrl = new URL(props.url);
  const nextUrl = setApiParamsInUrl(currentUrl, data);
  const fp = new URL(nextUrl);
  fp.pathname = "/partials/feed";

  return (
    <>
      <Onboarding />
      <AppContainer>
        <main role="main" className="min-w-0 min-h-0 w-full h-full">
          <Toolbar url={currentUrl} />
          <Partial name="carousel">
            <Carousel res={data} next={nextUrl} fp={fp} />
          </Partial>
        </main>
        <div className="min-w-0 min-h-0 w-full h-full">
          <NavBar />
        </div>
      </AppContainer>
    </>
  );
}
