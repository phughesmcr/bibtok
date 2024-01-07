import { getPericope } from "@data";
import type { BookInfo, Verse } from "@lib/types.ts";
import { refFromId } from "@lib/utils.ts";

type ArticleProps = {
  translation: string;
  idx: number;
  verse: Verse;
  key: number;
  posinset?: number;
  setsize?: number;
  bookInfo?: BookInfo;
};

export default function Article(props: ArticleProps) {
  const { idx, key, translation, verse, posinset, setsize, bookInfo } = props;
  const [id, text] = verse;

  const [b, c, v] = refFromId(id);
  const pericope = getPericope(id);

  if (!bookInfo) {
    return (
      <article
        key={key}
        aria-posinset={posinset}
        aria-setsize={setsize}
        tabIndex={0}
        className="ui w-full h-full snap-start snap-always"
      >
        <h1>Error: No bookInfo for {id}</h1>
      </article>
    );
  }

  return (
    <article
      key={key}
      aria-posinset={posinset}
      aria-setsize={setsize}
      data-verse={id}
      tabIndex={0}
      className="ui w-full h-full snap-start snap-always"
    >
      <div className="info w-full" tabIndex={0}>
        <h1 title="Book Title" aria-label="Book Title">{v === 1 ? bookInfo.title_full : bookInfo.title_short}</h1>
        <h2 title="Book reference" aria-label="Book reference">Chapter {c} - Verse {v}</h2>
        <h3 title="Pericope title" aria-label="Pericope title">{pericope?.t}</h3>
        <p>
          #<span title={bookInfo.otnt === "OT" ? "Old Testament" : "New Testament"}>{bookInfo.otnt}</span>{" "}
          #<span title={"Genre"}>{bookInfo.category.replace(/\s+/, "")}</span>{" "}
          #<span title={"Translation"}>{translation.toUpperCase()}</span> #<span title={"Verse ID"}>{id}</span>
        </p>
      </div>
      <p>{text}</p>
    </article>
  );
}
