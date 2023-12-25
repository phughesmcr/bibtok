import { Partial } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { API_DEFAULT_PAGE_SIZE, API_DEFAULT_TABLE, APP_NAME } from "@lib/constants.ts";
import { fetchWithParams, getApiParamsFromUrl } from "@lib/utils.ts";
import { batch } from "@preact/signals";
import { useContext } from "preact/hooks";
import Carousel from "../islands/Carousel.tsx";
import NavBar from "../islands/NavBar.tsx";
import { GlobalAppState } from "./_app.tsx";

export const handler: Handlers<ApiResponse> = {
  async GET(req, ctx) {
    const params = getApiParamsFromUrl(req.url);
    const url = new URL(req.url);
    const redirect = !["t", "s"].every((key) => url.searchParams.has(key));
    if (redirect) {
      url.searchParams.set("t", params.translation || API_DEFAULT_TABLE);
      url.searchParams.set("s", params.pageSize?.toString() || API_DEFAULT_PAGE_SIZE.toString());
      if (params.startFrom) url.searchParams.set("sv", params.startFrom.toString() || "");
      if (params.endAt) url.searchParams.set("ev", params.endAt?.toString() || "");
      if (params.cursor) url.searchParams.set("c", params.cursor || "");
      return Response.redirect(url, 307);
    }
    const data = await fetchWithParams(url.origin, params);
    const json = await data.json() as ApiResponse;
    return ctx.render(json);
  },
};

export default function Home(props: PageProps<ApiResponse>) {
  const { translation, endAt, pageSize, verses, cursor, startFrom } = useContext(GlobalAppState);

  batch(() => {
    if (props.data.translation) translation.value = props.data.translation;
    if (props.data.pageSize) pageSize.value = props.data.pageSize || API_DEFAULT_PAGE_SIZE;
    startFrom.value = props.data.startFrom;
    endAt.value = props.data.endAt;
    cursor.value = props.data.cursor;
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
            <Partial name="carousel">
              <Carousel data={verses.value} origin={props.url} />
            </Partial>
          </main>
          <nav className="min-w-0 min-h-0 w-full h-full">
            <NavBar />
          </nav>
        </div>
      </div>
    </div>
  );
}
