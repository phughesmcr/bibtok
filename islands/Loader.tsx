import { $isLoading } from "@lib/state.ts";
import { computed, effect } from "@preact/signals";
import IconLoader3 from "icons/loader-3.tsx";
import { useRef } from "preact/hooks";

export default function Loader() {
  const isLoading = computed(() => $isLoading.value);
  const loaderRef = useRef<HTMLDivElement>(null);

  effect(() => {
    if (isLoading.value) {
      loaderRef.current?.style.setProperty("display", "none", "import");
      loaderRef.current?.style.setProperty("visibility", "hidden", "import");
    } else {
      loaderRef.current?.style.setProperty("display", "flex", "import");
      loaderRef.current?.style.setProperty("visibility", null, "important");
    }
  });

  return (
    <div
      ref={loaderRef}
      hidden={isLoading}
      aria-hidden={isLoading}
      className="isolate absolute top-0 left-0 z-[100] w-full h-full flex flex-col justify-center items-center bg-zinc-700 text-zinc-100 opacity-90"
    >
      <IconLoader3 className="w-40 h-40 animate-spin" />
    </div>
  );
}
