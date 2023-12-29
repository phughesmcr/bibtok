import { getApiParamsFromUrl } from "@lib/utils.ts";
import IconSearch from "icons/search.tsx";

type ToolbarProps = {
  url: URL;
};

export default function Toolbar(props: ToolbarProps) {
  const { url } = props;

  const { cursor, endAt, pageSize, startFrom, translation } = getApiParamsFromUrl(url);

  // trigger redirect if select is changed

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className="z-40 fixed top-0 left-0 bg-transparent text-zinc-400 flex flex-row justify-between items-center w-full h-12 p-2"
    >
      <div>
        <select>
          <option selected={translation === "asv"}>ASV</option>
          <option selected={translation === "bbe"}>BBE</option>
          <option selected={translation === "kjv"}>KJV</option>
        </select>
      </div>

      <div>
        <button>
          <IconSearch class="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
