import { getBookInfoFromId, getPericope } from "@data";
import { getIdFromKvEntry, refFromId } from "@lib/utils.ts";
import { type Ref } from "preact";

type ArticleProps = {
  vid: number;
  translation: Translation;
  idx: number;
  verse: Deno.KvEntry<string>;
  isLast: boolean;
  ref?: Ref<HTMLElement> | null;
};

export default function Article(props: ArticleProps) {
  const { idx, translation, vid, verse, isLast } = props;

  const id = getIdFromKvEntry(verse);
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

  return (
    <article class="ui w-full h-full snap-start snap-always">
      <div class="info w-full">
        <h1>{v === 1 ? bookInfo.title_full : bookInfo.title_short}</h1>
        <h2>Chapter {c} - Verse {v}</h2>
        <h3>{pericope?.t}</h3>
        <p>#{bookInfo.otnt} #{bookInfo.category} #{translation.toUpperCase()}</p>
        <small>id: {id}; idx: {idx}; vid: {vid};</small>
      </div>
      <p>{verse.value}</p>
    </article>
  );
}
