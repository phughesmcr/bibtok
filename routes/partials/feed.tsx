import { Partial } from "$fresh/runtime.ts";
import { defineRoute, type RouteConfig } from "$fresh/server.ts";
import { fetchWithParams, getApiParamsFromUrl, setApiParamsInUrl } from "@lib/utils.ts";
import Carousel from "../../islands/Carousel.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (req, ctx) => {
  const params = getApiParamsFromUrl(req.url);
  const data = await fetchWithParams(req.url, params);
  const res = await data.json() as ApiResponse;
  if (res.cursor && res.cursor !== "-1") {
    delete res["cursor"];
  }
  return (
    <Partial name="carousel">
      <Carousel res={res} next={res.cursor ? setApiParamsInUrl(new URL(req.url), res) : undefined} />
    </Partial>
  );
});
