import { listOfBooks } from "@data";
import { $bookPericopes, $currentBook, $currentUrl, $pericopeSelected, $translation } from "@lib/state.ts";
import { effect } from "@preact/signals";
import { useRef } from "preact/hooks";

type ToolbarProps = {
  hidden?: boolean;
};

export default function Toolbar(props: ToolbarProps) {
  const { hidden } = props;
  if (hidden) {
    return <></>;
  }

  const periRef = useRef<HTMLSelectElement>(null);
  effect(() => {
    if (periRef.current) {
      periRef.current.value = $pericopeSelected.value.toString();
    }
  });

  const translations = [
    { title: "The American Standard Version", value: "asv", flag: "🇺🇸", innerText: "ASV" },
    { title: "The Bible in Basic English", value: "bbe", flag: "🇬🇧", innerText: "BBE" },
    { title: "The King James Version", value: "kjv", flag: "🇬🇧", innerText: "KJV" },
    { title: "Chinese Union Version (traditional)", value: "cut", flag: "🇨🇳", innerText: "和合本 (Traditional)" },
  ];

  return (
    <div
      role="toolbar"
      aria-label="Contents"
      aria-orientation="horizontal"
      className="fixed top-0 left-0 z-40 bg-transparent text-zinc-400 w-full max-w-lvw h-12 flex flex-row justify-center items-center flex-nowrap gap-1 mt-2 px-2"
    >
      <label
        htmlFor="translation-select"
        className="flex flex-col items-center justify-start max-w-[20%] w-[8ch] min-w-[3ch] shrink"
      >
        Trans.
        <select
          title="Bible Translation"
          aria-label="Select a Bible translation"
          name="translation-select"
          id="translation-select"
          className="p-1 rounded-full text-zinc-950 w-full"
          onChange={(e) => {
            const newUrl = new URL(location.href);
            newUrl.searchParams.set("t", `${$translation.value}`);
            $currentUrl.value = newUrl;
            location.href = newUrl.toString();
          }}
        >
          {translations.map((tr) => {
            return (
              <option
                title={tr.title}
                aria-label={tr.title}
                selected={$translation.value === tr.value}
                value={tr.value}
              >
                {tr.flag && <span className="flag-icon">{tr.flag}&nbsp;</span>}
                {tr.innerText}
              </option>
            );
          })}
        </select>
      </label>

      <label htmlFor="book-select" className="flex flex-col items-center justify-start max-w-[30%] min-w-[3ch] shrink">
        Book
        <select
          title="Book"
          aria-label="Select a book of the Bible"
          name="book-select"
          id="book-select"
          className="p-1 rounded-full text-zinc-950 w-full"
          onChange={(e) => {
            const newUrl = new URL(location.href);
            newUrl.pathname = `/bible/${e.currentTarget.value}`;
            newUrl.searchParams.delete("sv");
            newUrl.searchParams.delete("ev");
            newUrl.searchParams.delete("cursor");
            newUrl.searchParams.delete("idx");
            $currentUrl.value = newUrl;
            location.href = newUrl.toString();
          }}
        >
          {listOfBooks.map(([apiKey, title], index) => (
            <option
              key={index}
              title={title}
              aria-label={title}
              selected={index + 1 === $currentBook.value}
              value={apiKey}
            >
              {title}
            </option>
          ))}
        </select>
      </label>

      <label
        htmlFor="pericope-select"
        className="flex flex-col items-center justify-start max-w-[50%] min-w-[3ch] shrink"
      >
        Pericope
        <select
          ref={periRef}
          title="Pericope"
          aria-label="Select a pericope"
          name="pericope-select"
          id="pericope-select"
          className="p-1 rounded-full text-zinc-950 w-full"
          onChange={(e) => {
            const idx = parseInt(e.currentTarget.value, 10);
            const { r } = $bookPericopes.value[idx];
            const newUrl = new URL(location.href);
            newUrl.searchParams.set("sv", `${r[0]}`);
            newUrl.searchParams.delete("ev");
            newUrl.searchParams.delete("cursor");
            newUrl.searchParams.delete("idx");
            $currentUrl.value = newUrl;
            location.href = newUrl.toString();
          }}
        >
          {$bookPericopes.value.map((pericope, index) => {
            const { t } = pericope;
            return (
              <option
                key={index}
                title={t}
                aria-label={t}
                selected={index === $pericopeSelected.value}
                value={`${index}`}
              >
                {t}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
