import { browser } from '$app/environment';

export const scrollLock = (condition: boolean) => {
  if (browser) {
    document.body.style.overflow = condition ? 'hidden' : 'auto';
  }
};
