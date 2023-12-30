import { onboarded } from "@lib/state.ts";
import IconArrowBigUpLinesFilled from "icons/arrow-big-up-lines-filled.tsx";
import type { JSX } from "preact";
import { useCallback } from "preact/hooks";

export default function Onboarding() {
  const toggleOnboarded = useCallback(
    (
      e:
        | JSX.TargetedPointerEvent<HTMLDivElement>
        | JSX.TargetedTouchEvent<HTMLDivElement>
        | JSX.TargetedMouseEvent<HTMLDivElement>,
    ) => {
      onboarded.value = true;
      localStorage.setItem("onboarded", "true");
      e.currentTarget?.remove();
    },
    [onboarded],
  );

  return (
    <div
      hidden={onboarded.value}
      role="dialog"
      aria-label="Scroll up to get started!"
      aria-orientation="vertical"
      style={`display: ${onboarded.value ? "none" : "flex"};`}
      class="pointer-events-auto z-50 absolute top-0 left-0 flex-col items-center justify-center w-full h-full bg-zinc-100 text-zinc-700 opacity-70 touch-manipulation"
      onTouchStart={toggleOnboarded}
      onPointerMove={toggleOnboarded}
      onMouseDown={toggleOnboarded}
    >
      <IconArrowBigUpLinesFilled class="w-28 h-28 animate-up" />
      <p class="font-bold text-5xl">Scroll Up</p>
    </div>
  );
}
