import type { ComponentChildren } from "preact";

type NavButtonProps = {
  href: string;
  text: string;
  children: ComponentChildren;
};

export default function NavButton(props: NavButtonProps) {
  const { children, href, text } = props;
  return (
    <a href={href} className="flex flex-col flex-1 flex-nowrap items-center justify-center overflow-hidden">
      <div>
        {children}
      </div>
      <span className="text-xs text-ellipsis whitespace-nowrap text-center">{text}</span>
    </a>
  );
}
