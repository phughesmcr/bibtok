export default function NavBar() {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className="flex flex-row justify-around items-center p-1 gap-2 touch-none overflow-hidden h-full w-full max-w-full max-h-full"
    >
      <label>
        <input type="radio" name="nav" value="gospel" />
        Gospel
      </label>
      <label>
        <input type="radio" name="nav" value="psalms" checked />
        Psalms
      </label>
      <label>
        <input type="radio" name="nav" value="proverbs" />
        Proverbs
      </label>
      <label>
        <input type="radio" name="nav" value="catechism" />
        Catechism
      </label>
    </div>
  );
}
