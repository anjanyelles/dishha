import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { isValidResourceType, type ResourceFilters } from '$components/directory/filters.svelte';

export const urlResourceFilters = derived(page, ({ url: { searchParams } }) => {
  const keys = [...new Set(Array.from(searchParams.keys()))];

  return keys.reduce<ResourceFilters[]>((result, key) => {
    if (key === 'type') {
      searchParams.getAll(key).map((paramValue) => {
        result.push({
          type: isValidResourceType(paramValue) ? paramValue : null
        });
      });
    } else if (key === 'topic') {
      searchParams.getAll(key).map((paramValue) => {
        result.push({
          topic: paramValue
        });
      });
    }

    return result;
  }, []);
});
