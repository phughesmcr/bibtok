import { getApiParamsFromUrl } from "@lib/utils.ts";

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
      className="z-40 fixed top-0 left-0 bg-transparent text-zinc-400 flex flex-row justify-between items-center w-full h-12 px-2 py-3 mt-2"
    >
      <div class="grow">
        <select
          title="Bible Translation"
          aria-label="Select a Bible translation"
          name="translation-select"
          class="w-[7ch] p-2 rounded-full text-zinc-950"
          onChange={(e) => {
            // change ?t= in url to new value and redirect
            const newUrl = new URL(location.href);
            newUrl.searchParams.set("t", e.currentTarget.value);
            location.href = newUrl.toString();
          }}
        >
          <option
            title="The American Standard Version"
            aria-label="The American Standard Version"
            selected={translation === "asv"}
          >
            ASV
          </option>
          <option
            title="The Bible in Basic English"
            aria-label="The Bible in Basic English"
            selected={translation === "bbe"}
          >
            BBE
          </option>
          <option
            title="The King James Version"
            aria-label="The King James Version"
            selected={translation === "kjv"}
          >
            KJV
          </option>
        </select>
      </div>

      {
        /* <div class="grow">
        <button type="button">
          <IconSearch class="w-6 h-6" />
        </button>
      </div>
        */
      }
    </div>
  );
}