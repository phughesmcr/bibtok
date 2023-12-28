import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>Oops!</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-zinc-950 text-zinc-100">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Oops! Something went wrong.</h1>
          <p class="my-4">
            The page or data you were looking for doesn't exist.
          </p>
          <a href="/" class="underline font-bold">Go back home</a>
        </div>
      </div>
    </>
  );
}
