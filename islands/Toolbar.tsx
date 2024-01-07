import BookSelect from "@islands/BookSelect.tsx";
import PericopeSelect from "@islands/PericopeSelect.tsx";
import TranslationSelect from "@islands/TranslationSelect.tsx";

export default function Toolbar() {
  return (
    <div
      role="toolbar"
      aria-label="Contents"
      aria-orientation="horizontal"
      className="fixed top-0 left-0 z-40 w-full max-w-lvw h-13 mt-2 px-2 flex flex-row justify-center items-center flex-nowrap gap-1 bg-transparent text-zinc-400"
    >
      <TranslationSelect />
      <BookSelect />
      <PericopeSelect />
    </div>
  );
}
