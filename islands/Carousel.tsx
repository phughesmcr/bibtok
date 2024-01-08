import { API_DEFAULT_PAGE_SIZE, API_DEFAULT_TRANSLATION } from "@lib/constants.ts";
import { $currentUrl, $currentVerse, $isLoading } from "@lib/state.ts";
import type { ApiResponse } from "@lib/types.ts";
import { debounce, getRefFromId, isValidId } from "@lib/utils.ts";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import Article from "../components/Article.tsx";

type CarouselProps = {
  res: ApiResponse;
};

export default function Carousel({ res }: CarouselProps) {
  const { verses = [], pageSize = API_DEFAULT_PAGE_SIZE, translation = API_DEFAULT_TRANSLATION, next, extras } = res;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [idxInView, setIdxInView] = useState<number>(0);

  useEffect(() => {
    $currentVerse.value = verses[0][0] || $currentVerse.value;
  }, []);

  const scrollToTop = useCallback(() => {
    const { current } = containerRef;
    if (!current) return;
    current.scrollTo({ top: 0 });
    current.focus();
  }, [containerRef]);

  const setParams = useCallback(
    debounce((idx: number) => {
      const value = $currentUrl.peek();
      if (idx && value) {
        const newUrl = new URL(value);
        newUrl.searchParams.set("idx", `${idx}`); // TODO: also set ?current=
        $currentUrl.value = newUrl;
      }
    }, 100),
    [],
  );

  useEffect(() => {
    if (idxInView) setParams(idxInView);
    $isLoading.value = false;
  }, [idxInView, setParams]); // TODO: does setParams need to be in the deps?

  // START: SCROLLING OBSERVER

  const handleScrollIntoView = useCallback((entry: IntersectionObserverEntry) => {
    const debounced = debounce(() => {
      if (entry.isIntersecting) {
        const { target } = entry;
        if (!target) return;
        const pos = target.getAttribute("aria-posinset");
        const id = target.getAttribute("data-verse");
        if (pos) setIdxInView(parseInt(pos, 10));
        if (id) $currentVerse.value = parseInt(id, 10);
      }
    }, 400);
    debounced();
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
      {verses?.map((verse, index) => {
        const id = verse[0];
        if (!isValidId(id)) {
          return <></>;
        }
        const book = getRefFromId(id)[0];
        return (
          <Article
            idx={index}
            translation={translation}
            key={id}
            verse={verse}
            posinset={index + 1}
            setsize={((pageSize || -1) + 1) || -1} // (pageSize + 1) or -1
            bookInfo={extras?.books[book]}
            /* crossRefs={extras?.crossRefs[verse[0]]} */
          />
        );
      })}
      {next && (
        <article
          aria-posinset={(pageSize || verses.length) + 1}
          aria-setsize={((pageSize || -1) + 1) || -1} // pageSize or -1
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
