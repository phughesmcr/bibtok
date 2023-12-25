import { getBookInfoFromId, getPericope } from "@data";
import { refFromId, refToHex } from "@lib/utils.ts";

type ArticleProps = {
  translation: Translation;
  idx: number;
  verse: Verse;
};

export default function Article(props: ArticleProps) {
  const { idx, translation, verse } = props;
  const [id, text] = verse;

  const [b, c, v] = refFromId(id);
  const bookInfo = getBookInfoFromId(id + 1);
  const pericope = getPericope(id);

  if (!bookInfo) {
    return (
      <article class="ui w-full h-full snap-start snap-always">
        <h1>Error: No bookInfo for {id}</h1>
      </article>
    );
  }

  const hex = refToHex(b, c, v);

  return (
    <article class={`ui w-full h-full snap-start snap-always bg-[${hex}]`}>
      <div class="info w-full">
        <h1 aria-label="Book Title">{v === 1 ? bookInfo.title_full : bookInfo.title_short}</h1>
        <h2 aria-label="Book reference">Chapter {c} - Verse {v}</h2>
        <h3 aria-label="Pericope title">{pericope && pericope.t}</h3>
        <p>#{bookInfo.otnt} #{bookInfo.category} #{translation.toUpperCase()}</p>
        <small>id: {id}; idx: {idx}; vid: {id};</small>
      </div>
      <p>{text}</p>
    </article>
  );
}
