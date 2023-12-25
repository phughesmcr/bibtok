import { Partial } from "$fresh/runtime.ts";
import { defineRoute, type RouteConfig } from "$fresh/server.ts";
import { fetchWithParams, getApiParamsFromUrl } from "@lib/utils.ts";
import Carousel from "../../islands/Carousel.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (req, ctx) => {
  const params = getApiParamsFromUrl(req.url);
  const data = await fetchWithParams(req.url, params);
  const res = await data.json() as ApiResponse;

  return (
    <Partial name="carousel">
      <Carousel res={res} />
    </Partial>
  );
});
