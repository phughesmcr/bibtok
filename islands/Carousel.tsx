import Article from "../components/Article.tsx";

type CarouselProps = {
  res: ApiResponse;
};

export default function Carousel(props: CarouselProps) {
  const { res } = props;
  const { verses, cursor, endAt, pageSize, startFrom, translation } = res;

  const nextParams = `?t=${translation}&s=${pageSize}&c=${cursor || ""}&sv=${startFrom || ""}&ev=${endAt || ""}`;

  return (
    <>
      <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
        {verses?.map((verse, index) => (
          <Article
            idx={index}
            translation={translation || "???"}
            key={verse[0]}
            verse={verse}
          />
        ))}
        {/*f-partial={`/partials/feed${nextParams}`} */}
        {cursor && (
          <a
            href={`/${nextParams}`}
            class="w-full h-full snap-start snap-always flex items-center justify-center"
            onClick={(e) => {
              e.currentTarget.parentElement?.scrollTo({ top: 0 });
            }}
          >
            <span class="text-2xl">Load more</span>
          </a>
        )}
      </div>
    </>
  );
}
