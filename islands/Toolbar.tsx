import { getApiParamsFromUrl } from "@lib/utils.ts";

type ToolbarProps = {
  url: URL;
};

export default function Toolbar(props: ToolbarProps) {
  const { url } = props;
  const { translation } = getApiParamsFromUrl(url);
  return (
    <div
      role="toolbar"
      aria-label="Contents"
      aria-orientation="horizontal"
      className="z-40 fixed top-0 left-0 bg-transparent text-zinc-400 flex flex-row justify-between items-center w-full h-12 px-2 py-3 mt-2"
    >
      <div className="grow">
        <select
          title="Bible Translation"
          aria-label="Select a Bible translation"
          name="translation-select"
          className="w-[9ch] p-2 rounded-full text-zinc-950"
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
            value="asv"
          >
            <span className="flag-icon">🇺🇸</span>
            &nbsp;ASV
          </option>
          <option
            title="The Bible in Basic English"
            aria-label="The Bible in Basic English"
            selected={translation === "bbe"}
            value="bbe"
          >
            <span className="flag-icon">🇬🇧</span>
            &nbsp;BBE
          </option>
          <option
            title="Chinese Union Version (traditional)"
            aria-label="Chinese Union Version (traditional)"
            label="CUT"
            selected={translation === "cut"}
            value="cut"
          >
            <span className="flag-icon">🇨🇳</span>
            &nbsp;Chinese Union (Traditional)
          </option>
          <option
            title="The King James Version"
            aria-label="The King James Version"
            selected={translation === "kjv"}
            value="kjv"
          >
            <span className="flag-icon">🇬🇧</span>
            &nbsp;KJV
          </option>
        </select>
      </div>

      {
        /* <div className="grow">
        <button type="button">
          <IconSearch className="w-6 h-6" />
        </button>
      </div>
        */
      }
    </div>
  );
}
