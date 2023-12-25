import { useCallback, useContext, useEffect, useRef } from "preact/hooks";
import Article from "../components/Article.tsx";
import { GlobalAppState } from "../routes/_app.tsx";

type CarouselProps = {
  data: Verse[];
  origin?: string | URL;
};

export default function Carousel(props: CarouselProps) {
  const { data, origin } = props;
  const { translation, verses, endAt, startFrom, cursor, pageSize } = useContext(GlobalAppState);
  const lastElementRef = useRef<HTMLAnchorElement>(null);

  const next = useCallback(() => {
    if (!origin) return;
    const url = new URL(origin);
    if (startFrom.peek()) url.searchParams.set("sv", startFrom.peek()!.toString());
    if (endAt.peek()) url.searchParams.set("ev", endAt.peek()!.toString());
    url.searchParams.set("s", pageSize.peek().toString());
    url.searchParams.set("t", translation.peek());
    if (cursor.peek()) url.searchParams.set("c", cursor.peek()!);
    return url.href;
  }, [cursor]);

  const nextPartial = useCallback(() => {
    if (!origin) return;
    const url = new URL(origin);
    url.pathname = "/partials/feed/";
    if (startFrom.peek()) url.searchParams.set("sv", startFrom.peek()!.toString());
    if (endAt.peek()) url.searchParams.set("ev", endAt.peek()!.toString());
    url.searchParams.set("s", pageSize.peek().toString());
    url.searchParams.set("t", translation.peek());
    if (cursor.peek()) url.searchParams.set("c", cursor.peek()!);
    return url.href;
  }, [cursor]);

  useEffect(() => {
    console.log(lastElementRef.current);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        lastElementRef.current?.click();
      }
    });

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [lastElementRef, verses, next, nextPartial]);

  return (
    <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
      {data?.map((verse, index) => (
        <Article
          idx={index}
          translation={translation?.value || ""}
          key={verse[0]}
          verse={verse}
        />
      ))}
      {next && nextPartial && (
        <a
          ref={lastElementRef}
          href={next()}
          f-partial={nextPartial()}
          class="w-full h-16 flex items-center justify-center"
        >
          <span class="text-2xl">Load more</span>
        </a>
      )}
    </div>
  );
}
