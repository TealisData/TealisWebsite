import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during SSR and hydration, true on the client afterwards — without setState in an effect */
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
