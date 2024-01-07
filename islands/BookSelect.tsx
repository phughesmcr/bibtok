import { listOfBooks } from "@data";
import { $currentRef, $currentUrl } from "@lib/state.ts";
import type { JSX } from "preact";

type BookSelectProps = JSX.HTMLAttributes<HTMLSelectElement>;

export default function BookSelect(props: BookSelectProps) {
  return (
    <label htmlFor="book-select" className="flex flex-col items-center justify-start max-w-[30%] min-w-[3ch] shrink">
      Book
      <select
        title="Book"
        aria-label="Select a book of the Bible"
        name="book-select"
        id="book-select"
        className="p-1 rounded-full text-zinc-950 w-full"
        onChange={(e) => {
          const res = new URL($currentUrl.peek() ?? location.href);
          res.pathname = `/bible/${e.currentTarget.value ?? ""}`;
          res.searchParams.delete("sv");
          res.searchParams.delete("ev");
          res.searchParams.delete("cursor");
          res.searchParams.delete("idx");
          $currentUrl.value = res;
          location.href = res.toString();
        }}
      >
        {listOfBooks.map(([apiKey, title], index) => (
          <option
            key={index}
            title={title}
            aria-label={title}
            selected={index + 1 == $currentRef.value[0]}
            value={apiKey}
          >
            {title}
          </option>
        ))}
      </select>
    </label>
  );
}
