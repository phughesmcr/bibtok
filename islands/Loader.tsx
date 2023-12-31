import { $isLoading } from "@lib/state.ts";
import { effect } from "@preact/signals";
import IconLoader3 from "icons/loader-3.tsx";
import { useEffect, useRef } from "preact/hooks";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleLoading = () => {
    $isLoading.value = false;
  };

  effect(() => {
    if ($isLoading.value) {
      loaderRef.current?.style.setProperty("display", "none", "important");
      loaderRef.current?.style.setProperty("visibility", "hidden", "important");
    } else {
      loaderRef.current?.style.setProperty("display", "flex", "important");
      loaderRef.current?.style.setProperty("visibility", null, "important");
    }
  });

  useEffect(() => {
    const { window } = globalThis; // stops typescript complaining
    window.addEventListener("load", handleLoading, { passive: true });
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  return (
    <div
      ref={loaderRef}
      hidden={!$isLoading.value}
      aria-hidden={!$isLoading.value}
      className="isolate absolute top-0 left-0 z-[100] w-full h-full flex flex-col justify-center items-center bg-zinc-700 text-zinc-100 opacity-90"
    >
      <IconLoader3 className="w-40 h-40 animate-spin" />
    </div>
  );
}
