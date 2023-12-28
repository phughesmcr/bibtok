import { APP_NAME } from "@lib/constants.ts";
import type { ComponentChildren } from "preact";

type AppContainerProps = {
  children: ComponentChildren;
};

export default function AppContainer(props: AppContainerProps) {
  return (
    <div
      class="no-interaction w-[100dvw] h-[100dvh]"
      role="application"
      id={APP_NAME}
      name={APP_NAME}
      aria-label={APP_NAME}
    >
      <div
        role="none"
        class="z-0 top-0 left-0 absolute overflow-hidden no-interaction w-full h-full"
      >
        <div
          role="none"
          id="container"
          class="relative no-interaction w-full h-full"
          f-client-nav
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
