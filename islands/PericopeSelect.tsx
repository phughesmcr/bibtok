import { $bookPericopes, $currentPericopeIdx, $currentUrl } from "@lib/state.ts";
import { effect } from "@preact/signals";
import { useRef } from "preact/hooks";

export default function PericopeSelect() {
  const periRef = useRef<HTMLSelectElement>(null);
  effect(() => {
    if (periRef.current && $currentPericopeIdx.value !== -1) {
      periRef.current.value = $currentPericopeIdx.value.toString();
    }
  });

  return (
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
          const res = new URL($currentUrl.value ?? location?.href);
          res.searchParams.set("sv", `${r[0]}`);
          res.searchParams.delete("ev");
          res.searchParams.delete("cursor");
          res.searchParams.delete("idx");
          $currentUrl.value = res;
          location.href = res.toString();
        }}
        value={$currentPericopeIdx.value}
      >
        {$bookPericopes.value.map((pericope, index) => {
          const { t } = pericope;
          return (
            <option
              key={index}
              title={t}
              aria-label={t}
              selected={index == $currentPericopeIdx.value}
              value={index}
            >
              {t}
            </option>
          );
        })}
      </select>
    </label>
  );
}
