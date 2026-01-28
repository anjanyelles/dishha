import { derived, writable } from 'svelte/store';

export function createDebouncedValue<T>(initialValue: T, ms = 500) {
  const value = writable(initialValue);
  let timeout: NodeJS.Timeout;
  const debounced = derived(
    value,
    ($value, set) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => set($value), ms);

      return () => clearTimeout(timeout);
    },
    initialValue
  );

  return [value, debounced];
}
