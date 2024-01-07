import { TRANSLATIONS } from "@lib/constants.ts";
import { $currentUrl, $translation } from "@lib/state.ts";

export default function TranslationSelect() {
  return (
    <label
      htmlFor="translation-select"
      className="flex flex-col items-center justify-start max-w-[20%] w-[8ch] min-w-[3ch] shrink"
    >
      Trans.
      <select
        title="Bible Translation"
        aria-label="Select a bible translation"
        name="translation-select"
        id="translation-select"
        className="p-1 rounded-full text-zinc-950 w-full"
        onChange={(e) => {
          const res = new URL($currentUrl.peek() ?? location.href);
          res.searchParams.set("t", e.currentTarget.value);
          $currentUrl.value = res;
          if (location && location.href) location.href = res.toString();
        }}
        value={$translation.value}
      >
        {TRANSLATIONS.map((tr) => {
          return (
            <option
              title={tr.title}
              aria-label={tr.title}
              selected={$translation.value == tr.value}
              value={tr.value}
            >
              {tr.flag && <span className="flag-icon">{tr.flag}&nbsp;</span>}
              {tr.innerText}
            </option>
          );
        })}
      </select>
    </label>
  );
}
