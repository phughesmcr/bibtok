import { $fabUrl, $showFab } from "@lib/state.ts";
import { effect } from "@preact/signals";
import IconLocation from "icons/location.tsx";
import { useCallback } from "preact/hooks";

export default function Fab() {
  const findAChurchNearYou = useCallback(() => {
    const successCallback: PositionCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const url = new URL("https://www.achurchnearyou.com/search/");
      url.searchParams.set("lat", `${latitude}`);
      url.searchParams.set("lon", `${longitude}`);
      $fabUrl.value = url;
    };
    const errorCallback: PositionErrorCallback = (error: GeolocationPositionError) => {
      console.log(error);
    };
    navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback);
  }, []);

  effect(() => {
    findAChurchNearYou();
  });

  return (
    <>
      <div
        hidden={!$showFab}
        aria-hidden={!$showFab}
        className="absolute top-32 left-[-10px] w-12 h-12 rounded-full bg-amber-200 shadow-xl z-40 cursor-pointer border-2 border-solid border-yellow-50 opacity-90"
        aria-label="A floating button which links to a church near you"
        title="Find a church near you"
      >
        <a
          href={$fabUrl.value.toString()}
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center items-center text-black w-full h-full"
        >
          <IconLocation class="w-8 h-8" />
          <span className="sr-only">Find a church near you</span>
        </a>
      </div>
    </>
  );
}
