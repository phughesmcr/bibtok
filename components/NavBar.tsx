import IconBible from "icons/bible.tsx";
import IconMessageChatbot from "icons/message-chatbot.tsx";
import IconMusicHeart from "icons/music-heart.tsx";
import IconZoomQuestion from "icons/zoom-question.tsx";
import NavButton from "./NavButton.tsx";

export default function NavBar() {
  return (
    <nav
      role={"navigation"}
      aria-label=""
      aria-orientation="horizontal"
      className="flex flex-row justify-around items-center p-1 gap-1 touch-none overflow-hidden h-full w-full max-w-full max-h-full bg-zinc-900 text-zinc-100"
    >
      {/* TODO: Active styling */}
      <NavButton href="/bible" text="Bible">
        <IconBible className="w-5 h-5" />
      </NavButton>

      <NavButton href="/bible/psalms" text="Psalms">
        <IconMusicHeart className="w-5 h-5" />
      </NavButton>

      {
        /* <NavButton href="/lectionary" text="Daily">
        <IconCalendarExclamation className="w-5 h-5" />
      </NavButton> */
      }

      <NavButton href="/bible/proverbs" text="Proverbs">
        <IconMessageChatbot className="w-5 h-5" />
      </NavButton>

      <NavButton href="/catechism" text="Catechism">
        <IconZoomQuestion className="w-5 h-5" />
      </NavButton>
    </nav>
  );
}
