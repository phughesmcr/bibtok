import { useCallback, useRef } from "preact/hooks";
import Article from "../components/Article.tsx";

type CarouselProps = {
  res: ApiResponse;
  next?: URL;
  fp?: URL;
};

export default function Carousel(props: CarouselProps) {
  const { res, next, fp } = props;
  const { verses, cursor, endAt, pageSize, startFrom, translation } = res;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0 });
    containerRef.current?.focus();
  }, [containerRef.current]);

  return (
    <div
      ref={containerRef}
      role="feed"
      aria-busy="false"
      class="w-full h-full overflow-x-hidden overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2"
    >
      {verses?.map((verse, index) => (
        <Article
          idx={index}
          translation={translation || "???"}
          key={verse[0]}
          verse={verse}
          posinset={index + 1}
          setsize={((pageSize ?? -1) + 1) || -1} // (pageSize + 1) or -1
        />
      ))}
      {next && fp && (
        <article
          aria-posinset={(pageSize ?? verses.length) + 1}
          aria-setsize={((pageSize ?? -1) + 1) || -1} // pageSize or -1
          key={crypto.randomUUID()}
          class="w-full h-full snap-start snap-always mb-4"
        >
          <a
            href={next.toString()}
            f-partial={fp.toString()}
            class="w-full h-full flex items-center justify-center"
            onClick={scrollToTop}
            aria-label="Load more"
          >
            <span class="text-2xl underline">Load more</span>
          </a>
        </article>
      )}
    </div>
  );
}
