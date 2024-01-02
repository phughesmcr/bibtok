import { getApiParamsFromUrl } from "@lib/utils.ts";
import { useSignal } from "@preact/signals";
import IconSearch from "icons/search.tsx";

type ToolbarProps = {
  url: URL;
};

export default function Toolbar(props: ToolbarProps) {
  const { url } = props;
  const { translation } = getApiParamsFromUrl(url);
  const translationSelected = useSignal(translation);
  const bookSelected = useSignal(parseInt(url.searchParams?.get("sv")?.slice(0, 2) || "01", 10));
  const chapterSelected = useSignal(parseInt(url.searchParams?.get("sv")?.slice(2, 5) || "001", 10));
  const verseSelected = useSignal(parseInt(url.searchParams?.get("sv")?.slice(5, 8) || "001", 10));
  return (
    <div
      role="toolbar"
      aria-label="Contents"
      aria-orientation="horizontal"
      className="z-40 fixed top-0 left-0 bg-transparent text-zinc-400 flex flex-row justify-start items-center flex-nowrap w-full max-w-full h-12 px-2 py-3 mt-2"
    >
      <button
        type="button"
        onClick={() => {
          const newUrl = new URL(location.href);
          // deno-fmt-ignore
          const newId = `${bookSelected.value.toString().padStart(2, "0")}${chapterSelected.value.toString().padStart(3, "0")}${verseSelected.value.toString().padStart(3, "0")}`;
          newUrl.searchParams.set("sv", newId);
          newUrl.searchParams.set("ev", `${newId.substring(0, 5)}999`);
          newUrl.searchParams.set("t", `${translationSelected.value}`);
          location.href = newUrl.toString();
        }}
      >
        <IconSearch className="w-6 h-6" />
      </button>
    </div>
  );
}
