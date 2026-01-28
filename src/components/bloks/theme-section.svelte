<script lang="ts">
  import { page } from '$app/stores';
  import type { ThemeSectionStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { getAccentTheme } from '$lib/utils/themes';

  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';

  export let blok: ThemeSectionStoryblok;
  $: ({ theme, body, is_rounded_on_top, is_rounded_on_bottom, top_transition_theme } = blok);
  $: story = $page.data.story;

  $: accentTheme = getAccentTheme(story.content?.theme);
</script>

<section data-theme={accentTheme} class="relative isolate bg-background">
  {#if top_transition_theme}
    <span
      data-theme={top_transition_theme}
      class="absolute left-0 top-0 -z-10 h-100 w-full bg-highlight-secondary"
    />
  {/if}
  <div
    data-theme={theme ? theme : 'dark'}
    class={cn(
      'z-20 h-full overflow-hidden bg-background',
      is_rounded_on_top && 'rounded-t-3xl',
      is_rounded_on_bottom && 'rounded-b-3xl'
    )}
  >
    {#each body || [] as b}
      <DynamicBlok blok={b} />
    {/each}
  </div>
</section>
