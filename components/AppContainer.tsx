import { APP_NAME } from "@lib/constants.ts";
import type { ComponentChildren } from "preact";

type AppContainerProps = {
  children: ComponentChildren;
};

export default function AppContainer(props: AppContainerProps) {
  const { children } = props;
  return (
    <div
      id="app-container"
      class="no-interaction isolate block box-border antialiased w-dvw h-dvh max-w-vw max-h-vh"
      name={APP_NAME}
      aria-label={APP_NAME}
    >
      <div
        id="outer-container"
        class="no-interaction absolute top-0 left-0 overflow-hidden w-full h-full z-0"
      >
        <div
          id="inner-container"
          class="no-interaction relative w-full h-full grid grid-cols-1"
          f-client-nav
        >
          {children}
        </div>
      </div>
    </div>
  );
}
