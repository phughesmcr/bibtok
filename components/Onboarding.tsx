import IconArrowBigUpLinesFilled from "icons/arrow-big-up-lines-filled.tsx";

export default function Onboarding() {
  return (
    <div
      class="pointer-events-auto z-50 absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-zinc-100 text-zinc-700 opacity-80 touch-manipulation"
      onTouchStart={(e) => {
        e.currentTarget.remove();
      }}
      onPointerMove={(e) => {
        e.currentTarget.remove();
      }}
      onMouseDown={(e) => {
        e.currentTarget.remove();
      }}
    >
      <IconArrowBigUpLinesFilled class="w-28 h-28 animate-up" />
      <p class="font-bold text-5xl">Scroll Up</p>
    </div>
  );
}
