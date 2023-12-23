import { fetchWithParams } from "@lib/utils.ts";
import { useContext, useEffect, useRef } from "preact/hooks";
import Article from "../components/Article.tsx";
import { GlobalAppState } from "../routes/_app.tsx";

export default function Carousel() {
  const { translation, verses, endAt, startFrom, cursor, pageSize } = useContext(GlobalAppState);
  const lastElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const res = await fetchWithParams(window.location.origin, {
          startFrom: startFrom.peek(),
          endAt: endAt.peek(),
          pageSize: pageSize.peek(),
          translation: translation.peek(),
          cursor: cursor.peek(),
        });
        const { verses: newVerses, cursor: newCursor } = await res.json();
        cursor.value = newCursor;
        verses.value = [...verses.peek(), ...newVerses];
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
  }, [lastElementRef, verses]);

  return (
      <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
        {verses.value?.map((verse, index, arr) => (
          index === arr.length - 1
            ? (
              <Article
                idx={index}
                translation={translation.value}
                key={verse[0]}
                verse={verse}
                ref={lastElementRef}
              />
            )
            : (
              <Article
                idx={index}
                translation={translation.value}
                key={verse[0]}
                verse={verse}
                isLast={true}
              />
            )
        ))}
      </div>
  );
}
