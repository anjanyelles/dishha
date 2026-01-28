<script lang="ts">
  import Title from '$components/title.svelte';
  import type { LogoCardsSectionStoryblok } from '$types/bloks';
  import LogoCards from './logo-cards.svelte';

  export let blok: LogoCardsSectionStoryblok;
  $: ({ title, cards } = blok);
</script>

<section class="relative isolate overflow-hidden">
  <div class="relative flex w-full flex-col px-20 lg:mx-auto xl:max-w-container xl:px-48">
    {#if title?.[0]}
      <Title data={title[0]} class="w-full py-48" />
    {/if}

    {#if cards?.[0]}
      <LogoCards blok={cards[0]} class="-mt-0 px-0 pb-72 xl:-mt-0 xl:px-0" />
    {/if}
  </div>
</section>
