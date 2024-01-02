import { type Signal, signal } from "@preact/signals";

/**
 * A signal that indicates whether the user has onboarded.
 * Prevents the onboarding component from being displayed if `true`.
 */
export const onboarded: Signal<boolean> = signal<boolean>(!!JSON.parse(localStorage?.getItem("onboarded") ?? "false"));
