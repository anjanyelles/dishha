import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const createMediaStore = (query: string) => {
  if (!browser) {
    return readable(false, () => {
      // noop
    });
  }

  const mediaQuery = window.matchMedia(query);
  const mediaStore = readable(mediaQuery.matches, (set) => {
    const listener = (e: MediaQueryListEvent) => set(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  });
  return mediaStore;
};
