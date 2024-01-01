import { debounce, refFromId, setParamWithoutReload } from "@lib/utils.ts";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import Article from "../components/Article.tsx";

type CarouselProps = {
  res: ApiResponse;
  extras?: VerseExtras;
  next?: VerseNextPageParams;
};

export default function Carousel(props: CarouselProps) {
  const { res, extras, next } = props;
  const { verses, pageSize, translation } = res;

  const containerRef = useRef<HTMLDivElement>(null);
  const [idxInView, setIdxInView] = useState<number>(0);

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0 });
    containerRef.current?.focus();
  }, [containerRef.current]);

  const setParams = useCallback(
    debounce((idx: number) => {
      if (idx) setParamWithoutReload("idx", idx.toString());
    }, 250),
    [],
  );

  useEffect(() => {
    if (idxInView) setParams(idxInView);
  }, [idxInView, setParams]);

  // START: SCROLLING OBSERVER

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleScrollIntoView = useCallback((entry: IntersectionObserverEntry) => {
    requestAnimationFrame(debounce(() => {
      if (entry.isIntersecting) {
        const pos = entry.target?.getAttribute("aria-posinset");
        if (pos) setIdxInView(parseInt(pos));
        // TODO: trigger load next here
      }
    }, 250));
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => handleScrollIntoView(entry));
    }, { threshold: 1 });

    const articles = document.querySelectorAll("article");
    articles.forEach((article) => observerRef.current?.observe(article));

    return () => {
      if (observerRef.current) {
        articles.forEach((article) => observerRef.current?.unobserve(article));
        observerRef.current = null;
      }
    };
  }, [handleScrollIntoView]);

  // END: SCROLLING OBSERVER

  return (
    <div
      ref={containerRef}
      role="feed"
      aria-busy="false"
      className="w-full h-full overflow-x-hidden overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2"
    >
      {verses?.map((verse, index) => (
        <Article
          idx={index}
          translation={translation || "???"}
          key={verse[0]}
          verse={verse}
          posinset={index + 1}
          setsize={((pageSize ?? -1) + 1) || -1} // (pageSize + 1) or -1
          bookInfo={extras?.books[refFromId(verse[0])[0]]}
        />
      ))}
      {next && (
        <article
          aria-posinset={(pageSize ?? verses.length) + 1}
          aria-setsize={((pageSize ?? -1) + 1) || -1} // pageSize or -1
          key={crypto.randomUUID()}
          className="w-full h-full snap-start snap-always mb-4"
        >
          <a
            href={next.url.toString()}
            f-partial={next.fp.toString()}
            className="w-full h-full flex items-center justify-center"
            onClick={scrollToTop}
            aria-label="Load more"
          >
            <span className="text-2xl underline">Load more</span>
          </a>
        </article>
      )}
    </div>
  );
}
