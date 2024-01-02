import { getBookIdFromTitle, listOfBooks } from "@data";
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
      {
        <div className="grow flex flex-row flex-nowrap justify-center gap-2 md:justify-end items-center max-w-full">
          {/* TODO: fix styling on smallest size */}
          <select
            title="Bible Translation"
            aria-label="Select a Bible translation"
            name="translation-select"
            className="w-[9ch] p-2 rounded-full text-zinc-950"
            onChange={(e) => {
              translationSelected.value = e.currentTarget.value as Translation;
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
              title="The King James Version"
              aria-label="The King James Version"
              selected={translation === "kjv"}
              value="kjv"
            >
              <span className="flag-icon">🇬🇧</span>
              &nbsp;KJV
            </option>
            <option
              title="Chinese Union Version (traditional)"
              aria-label="Chinese Union Version (traditional)"
              label="和合本"
              selected={translation === "cut"}
              value="cut"
            >
              <span className="flag-icon">🇨🇳</span>
              &nbsp;和合本 (Traditional)
            </option>
          </select>
          <select
            title="Book"
            aria-label="Select a book of the Bible"
            name="book-select"
            className="p-2 rounded-full text-zinc-950 max-w-[20%]"
            onChange={(e) => {
              bookSelected.value = getBookIdFromTitle(e.currentTarget.value) ?? 1;
            }}
          >
            {listOfBooks.map(([apiKey, title], index) => (
              <option
                key={index}
                title={title}
                aria-label={title}
                selected={index === 0} // TODO: set selected based on url
                value={apiKey}
              >
                {title}
              </option>
            ))}
          </select>
          {/* TODO max based on selected book */}
          <input
            name="chapter-input"
            title="Chapter"
            aria-label="Which chapter?"
            type="number"
            className="rounded w-[7ch]"
            value={1}
            min={1}
            max={150}
            onChange={(e) => {
              chapterSelected.value = parseInt(e.currentTarget.value, 10) ?? 1;
            }}
          />
          {/* TODO max based on selected book / chapter */}
          <input
            name="verse-input"
            title="Verse"
            aria-label="Which verse?"
            type="number"
            className="rounded w-[7ch]"
            value={1}
            min={1}
            max={176}
            onChange={(e) => {
              verseSelected.value = parseInt(e.currentTarget.value, 10) ?? 1;
            }}
          />
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
      }
    </div>
  );
}
