import { getBookInfoFromId, getPericope } from "@data";
import { refFromId } from "@lib/utils.ts";

type ArticleProps = {
  translation: string;
  idx: number;
  verse: Verse;
  key: number;
  posinset?: number;
  setsize?: number;
};

export default function Article(props: ArticleProps) {
  const { idx, key, translation, verse, posinset, setsize } = props;
  const [id, text] = verse;

  const [b, c, v] = refFromId(id);
  const bookInfo = getBookInfoFromId(id + 1);
  const pericope = getPericope(id);

  if (!bookInfo) {
    return (
      <article
        key={key}
        aria-posinset={posinset}
        aria-setsize={setsize}
        class="ui w-full h-full snap-start snap-always"
      >
        <h1>Error: No bookInfo for {id}</h1>
      </article>
    );
  }

  return (
    <article key={key} aria-posinset={posinset} aria-setsize={setsize} class="ui w-full h-full snap-start snap-always">
      <div class="info w-full">
        <h1 aria-label="Book Title">{v === 1 ? bookInfo.title_full : bookInfo.title_short}</h1>
        <h2 aria-label="Book reference">Chapter {c} - Verse {v}</h2>
        <h3 aria-label="Pericope title">{pericope?.t}</h3>
        <p>#{bookInfo.otnt} #{bookInfo.category.replace(/\s+/, "")} #{translation.toUpperCase()} #{id}</p>
      </div>
      <p>{text}</p>
    </article>
  );
}
