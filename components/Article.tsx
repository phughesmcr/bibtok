import { Translation } from "@db";
import { getBookInfoFromId, getDataFromId, getIdFromKvEntry } from "../lib/utils.ts";

type ArticleProps = {
  vid: number;
  translation: Translation;
  idx: number;
  verse: Deno.KvEntry<string>;
}

export default function Article(props: ArticleProps) {
  const { idx, translation, vid, verse } = props;

  const id = getIdFromKvEntry(verse);
  const [b, c, v] = getDataFromId(id);
  const bookInfo = getBookInfoFromId(id + 1);

  if (!bookInfo) {
    return (
      <article class="ui w-full h-full snap-start snap-always">
        <h1>Error: No bookInfo for {id}</h1>
        <h2>{c}:{v}</h2>
        <p>{verse.value}</p>
        <small>id: {id}; idx: {idx}; vid: {vid}; t: {translation.toUpperCase()}</small>
      </article>
    );
  }

  return (
    <article class="ui w-full h-full snap-start snap-always">
      <h1>{v > 1 ? bookInfo.title_short : bookInfo.title_full}</h1>
      <h2>{c}:{v}</h2>
      <p>{verse.value}</p>
      <small>id: {id}; idx: {idx}; vid: {vid}; t: {translation.toUpperCase()}</small>
    </article>
  );
}
