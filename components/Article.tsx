import { Translation } from "@db";
import { getIdFromKvEntry } from "../lib/utils.ts";

type ArticleProps = {
  vid: number;
  translation: Translation;
  idx: number;
  verse: Deno.KvEntry<string>;
}

export default function Article(props: ArticleProps) {
  const { idx, translation, vid, verse } = props;
  return (
    <article class="ui w-full h-full snap-start snap-always">
      <h1>{getIdFromKvEntry(verse)} - {translation.toUpperCase()}</h1>
      <p>{verse.value}</p>
      <small>idx: {idx}; vid: {vid}</small>
    </article>
  );
}
