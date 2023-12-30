import { type Signal, signal } from "@preact/signals";

export const onboarded: Signal<boolean> = signal<boolean>(localStorage.getItem("onboarded") === "true");
