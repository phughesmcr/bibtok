import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { fetchWithParams, getApiParamsFromUrl } from "@lib/utils.ts";
import Carousel from "../../islands/Carousel.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (req, ctx) => {
  const params = getApiParamsFromUrl(req.url);
  const res = await fetchWithParams(req.url, params);
  const { verses, cursor: newCursor } = await res.json() as ApiResponse;
  const url = new URL(req.url);
  url.searchParams.set("c", newCursor || "-1");

  return (
    <Partial name="carousel">
      <Carousel data={verses} origin={url} />
    </Partial>
  );
});
