<script lang="ts">
  import { page } from '$app/stores';
  import type { PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/svelte';

  import Seo from '$components/seo.svelte';
  import CommingSoon from '$components/coming-soon.svelte';
  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';

  export let blok: PageStoryblok;

  $: story = $page.data.story as ISbStoryData<PageStoryblok>;
</script>

<Seo />

{#if story.content.is_coming_soon}
  <CommingSoon />
{:else}
  <main data-theme={story?.content?.theme || 'light'} class="bg-background">
    {#each blok.body || [] as b}
      <DynamicBlok blok={b} />
    {/each}
  </main>
{/if}
