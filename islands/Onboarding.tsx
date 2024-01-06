import { LS_KEY_ONBOARD } from "@lib/constants.ts";
import { $isOnboard } from "@lib/state.ts";
import { effect } from "@preact/signals";
import IconArrowBigUpLinesFilled from "icons/arrow-big-up-lines-filled.tsx";
import { useCallback, useEffect, useRef } from "preact/hooks";

export default function Onboarding() {
  const dialogRef = useRef<HTMLDivElement>(null);

  effect(() => {
    if ($isOnboard.value) {
      dialogRef.current?.remove();
      dialogRef.current?.classList.add("hidden");
      dialogRef.current?.classList.remove("flex");
    } else {
      dialogRef.current?.classList.remove("hidden");
      dialogRef.current?.classList.add("flex");
    }
  });

  const toggleIsOnboard = useCallback(() => {
    $isOnboard.value = true;
    localStorage?.setItem(LS_KEY_ONBOARD, "true");
  }, []);

  useEffect(() => {
    $isOnboard.value = !!JSON.parse(localStorage?.getItem(LS_KEY_ONBOARD) ?? "false");
  }, []);

  return (
    <div
      tabIndex={0}
      ref={dialogRef}
      hidden={$isOnboard}
      aria-hidden={$isOnboard}
      role="dialog"
      aria-label="Scroll up to get started!"
      aria-orientation="vertical"
      className="pointer-events-auto z-50 flex isolate absolute top-0 left-0 flex-col items-center justify-center w-full h-full bg-zinc-100 text-zinc-700 opacity-70 touch-manipulation"
      onTouchStart={toggleIsOnboard}
      onPointerDown={toggleIsOnboard}
      onMouseDown={toggleIsOnboard}
    >
      <button
        type="button"
        aria-label="close dialog"
        className="absolute top-10 right-0 text-3xl m-4"
        tabIndex={0}
        onClick={toggleIsOnboard}
      >
        &times;
      </button>
      <IconArrowBigUpLinesFilled className="w-28 h-28 animate-up" />
      <p className="font-bold text-5xl">Scroll Up</p>
    </div>
  );
}
