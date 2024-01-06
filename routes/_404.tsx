import { Head } from "$fresh/runtime.ts";
import { APP_NAME } from "@lib/constants.ts";

export default function Error404(props?: { message?: string }) {
  const { message = "The page or data you were looking for doesn't exist." } = props || {};
  return (
    <>
      <Head>
        <title>{APP_NAME} | Oops!</title>
      </Head>
      <div className="px-4 py-8 mx-auto bg-zinc-950 text-zinc-100 w-full h-full">
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Something went wrong.</h1>
          <p className="my-4">
            {message}
          </p>
          <a href="/" className="underline font-bold">Go back home</a>
        </div>
      </div>
    </>
  );
}
