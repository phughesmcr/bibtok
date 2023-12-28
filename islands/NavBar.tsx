import IconBible from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/bible.tsx";
import IconMessageChatbot from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/message-chatbot.tsx";
import IconMusicHeart from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/music-heart.tsx";
import IconZoomQuestion from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/zoom-question.tsx";

export default function NavBar() {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className="flex flex-row justify-around items-center p-1 gap-2 touch-none overflow-hidden h-full w-full max-w-full max-h-full"
    >
      <a href="/" className="flex flex-col items-center justify-center">
        <span className="text-2xl">
          <IconBible class="w-6 h-6" />
        </span>
        <span className="text-xs">Bible</span>
      </a>
      <a href="/psalms" className="flex flex-col items-center justify-center">
        <span className="text-2xl">
          <IconMusicHeart class="w-6 h-6" />
        </span>
        <span className="text-xs">Psalms</span>
      </a>
      <a href="/proverbs" className="flex flex-col items-center justify-center">
        <span className="text-2xl">
          <IconMessageChatbot class="w-6 h-6" />
        </span>
        <span className="text-xs">Proverbs</span>
      </a>
      <a href="/catechism" className="flex flex-col items-center justify-center">
        <span className="text-2xl">
          <IconZoomQuestion class="w-6 h-6" />
        </span>
        <span className="text-xs">Catechism</span>
      </a>
    </div>
  );
}
