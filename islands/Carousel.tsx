import { useContext } from "preact/hooks";
import Article from "../components/Article.tsx";
import { GlobalAppState } from "../routes/_app.tsx";

export default function Carousel() {
  const { translation, verses, vid } = useContext(GlobalAppState);
  return (
    <div role="feed" class="w-full h-full overflow-y-auto hide-scrollbars touch-pan-y snap-y snap-mandatory p-2">
      {verses.value.map((verse, index) => (
        <Article idx={index} translation={translation.value} vid={vid.value} verse={verse} />
      ))}
    </div>
  );
}
