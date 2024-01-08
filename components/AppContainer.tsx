import { APP_NAME } from "@lib/constants.ts";
import type { ComponentChildren } from "preact";

type AppContainerProps = {
  children: ComponentChildren;
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div
      id="app-container"
      className="no-interaction isolate block box-border antialiased w-dvw h-dvh max-w-vw max-h-vh"
      name={APP_NAME}
      aria-label={APP_NAME}
    >
      <div
        id="outer-container"
        className="no-interaction absolute top-0 left-0 overflow-hidden w-full h-full z-0"
      >
        <div
          id="inner-container"
          className="no-interaction relative w-full h-full grid grid-cols-1"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
