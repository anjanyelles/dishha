<script lang="ts">
  import type { NewsletterStoryblok } from '$types/bloks';

  import Title from '$components/title.svelte';
  import Background from '$components/newsletter/background.svelte';

  export let blok: NewsletterStoryblok;
  $: ({ title } = blok);
</script>

<section class="flex w-full items-center overflow-hidden">
  <div class="container relative mx-auto flex items-center justify-center xl:h-[486px]">
    <Background />
    <div
      class="flex max-w-[744px] flex-col items-center justify-center gap-24 px-20 py-48 xl:px-48"
    >
      {#if title?.[0]}
        <Title data={title[0]} class="max-w-[532px] items-center text-center xl:items-center" />
      {/if}
    </div>
  </div>
</section>
