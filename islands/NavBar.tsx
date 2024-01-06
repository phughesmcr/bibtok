import { $currentUrl } from "@lib/state.ts";
import IconBible from "icons/bible.tsx";
import IconMessageChatbot from "icons/message-chatbot.tsx";
import IconMusicHeart from "icons/music-heart.tsx";
import IconZoomQuestion from "icons/zoom-question.tsx";
import NavButton from "../components/NavButton.tsx";

type NavbarProps = {
  url: URL;
};

export default function NavBar(props: NavbarProps) {
  const { url } = props;
  const bibleUrl = new URL(url);
  bibleUrl.pathname = "/bible";

  const psalmsUrl = new URL(url);
  psalmsUrl.searchParams.delete("sv");
  psalmsUrl.searchParams.delete("ev");
  psalmsUrl.searchParams.delete("cursor");

  const proverbsUrl = new URL(psalmsUrl);
  const catechismUrl = new URL(psalmsUrl);

  psalmsUrl.pathname = "/psalms";
  proverbsUrl.pathname = "/proverbs";
  catechismUrl.pathname = "/catechism";

  return (
    <div className="min-w-0 min-h-0 w-full h-full" f-client-nav={false}>
      <nav
        role={"navigation"}
        aria-label=""
        aria-orientation="horizontal"
        className="flex flex-row justify-around items-center p-1 gap-1 touch-none overflow-hidden h-full w-full max-w-full max-h-full bg-zinc-900 text-zinc-100"
      >
        <NavButton
          href={bibleUrl.toString()}
          innerText="Bible"
          onClick={() => {
            $currentUrl.value = bibleUrl;
          }}
        >
          <IconBible className="w-5 h-5" />
        </NavButton>

        <NavButton
          href={psalmsUrl.toString()}
          innerText="Psalms"
          onClick={() => {
            $currentUrl.value = psalmsUrl;
          }}
        >
          <IconMusicHeart className="w-5 h-5" />
        </NavButton>

        {
          /* <NavButton href="/lectionary" innerText="Daily">
        <IconCalendarExclamation className="w-5 h-5" />
      </NavButton> */
        }

        <NavButton
          href={proverbsUrl.toString()}
          onClick={() => {
            $currentUrl.value = proverbsUrl;
          }}
          innerText="Proverbs"
        >
          <IconMessageChatbot className="w-5 h-5" />
        </NavButton>

        <NavButton
          href={catechismUrl.toString()}
          onClick={() => {
            $currentUrl.value = catechismUrl;
          }}
          innerText="Catechism"
        >
          <IconZoomQuestion className="w-5 h-5" />
        </NavButton>
      </nav>
    </div>
  );
}
