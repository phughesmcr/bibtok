import { Partial } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { APP_NAME } from "@lib/constants.ts";
import { fetchWithParams, getApiParamsFromUrl, setApiParamsInUrl } from "@lib/utils.ts";
import Carousel from "../islands/Carousel.tsx";
import NavBar from "../islands/NavBar.tsx";

export const handler: Handlers<ApiResponse> = {
  async GET(req, ctx) {
    const params = getApiParamsFromUrl(req.url);
    const url = new URL(req.url);
    const redirect = !["t", "s"].every((key) => url.searchParams.has(key));
    if (redirect) {
      return new Response("", {
        status: 307,
        headers: { Location: `/?${setApiParamsInUrl(url, params).searchParams.toString()}` },
      });
    }
    const data = await fetchWithParams(url.origin, params);
    const json = await data.json() as ApiResponse;
    return ctx.render(json);
  },
};

export default function Home(props: PageProps<ApiResponse>) {
  const { data } = props;
  const nextUrl = setApiParamsInUrl(new URL(props.url), data);

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
          f-client-nav
        >
          <main className="min-w-0 min-h-0 w-full h-full">
            <Partial name="carousel">
              <Carousel res={props.data} next={nextUrl} />
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
