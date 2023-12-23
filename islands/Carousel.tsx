import { useContext, useEffect, useRef } from "preact/hooks";
import Article from "../components/Article.tsx";
import { GlobalAppState } from "../routes/_app.tsx";

export default function Carousel() {
  const { translation, verses, vid, cursor, pageSize } = useContext(GlobalAppState);
  const lastElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const url = new URL(
          `/api/v1/verses?cursor=${cursor.value}&pageSize=${pageSize.value}&translation=${translation.value}&vid=${vid.value}`,
          window.location.origin,
        );
        const data = await fetch(url);
        const { verses: newVerses, cursor: newCursor } = await data.json();
        cursor.value = newCursor;
        verses.value = [...verses.value, ...newVerses];
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
      {verses.value?.map((verse, index) => (
        <Article
          idx={index}
          translation={translation.value}
          vid={vid.value}
          verse={verse}
          ref={index === verses.value.length - 1 ? lastElementRef : null}
          isLast={index === verses.value.length - 1 ? true : false}
        />
      ))}
    </div>
  );
}
