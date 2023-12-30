import { onboarded } from "@lib/state.ts";
import IconArrowBigUpLinesFilled from "icons/arrow-big-up-lines-filled.tsx";
import { useCallback, useRef } from "preact/hooks";

export default function Onboarding() {
  const dialogRef = useRef<HTMLDivElement>(null);

  const toggleOnboarded = useCallback(() => {
    onboarded.value = true;
    localStorage.setItem("onboarded", "true");
    dialogRef.current?.remove();
  }, [onboarded]);

  return (
    <div
      tabIndex={0}
      ref={dialogRef}
      hidden={onboarded.value}
      role="dialog"
      aria-label="Scroll up to get started!"
      aria-orientation="vertical"
      style={`display: ${onboarded.value ? "none" : "flex"};`}
      class="pointer-events-auto z-50 absolute top-0 left-0 flex-col items-center justify-center w-full h-full bg-zinc-100 text-zinc-700 opacity-70 touch-manipulation"
      onTouchStart={toggleOnboarded}
      onPointerDown={toggleOnboarded}
      onMouseDown={toggleOnboarded}
    >
      <button
        type="button"
        aria-label="close dialog"
        class="absolute top-0 right-0 text-3xl m-4"
        tabIndex={0}
        onClick={toggleOnboarded}
      >
        &times;
      </button>
      <IconArrowBigUpLinesFilled class="w-28 h-28 animate-up" />
      <p class="font-bold text-5xl">Scroll Up</p>
    </div>
  );
}
