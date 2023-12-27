import Article from "../components/Article.tsx";

type CarouselProps = {
  res: ApiResponse;
  next?: URL;
};

export default function Carousel(props: CarouselProps) {
  const { res, next } = props;
  const { verses, cursor, endAt, pageSize, startFrom, translation } = res;

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
        {next && (
          <a
            href={next.toString()}
            class="w-full h-full snap-start snap-always flex items-center justify-center"
            onClick={(e) => {
              e.currentTarget.parentElement?.scrollTo({ top: 0 });
            }}
          >
            <span class="text-2xl underline">Load more</span>
          </a>
        )}
      </div>
    </>
  );
}
