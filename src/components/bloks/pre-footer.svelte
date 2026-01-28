<script lang="ts">
  import type { PreFooterStoryblok } from '$types/bloks';

  import Title from '$components/title.svelte';
  import Illustrations from '$components/pre-footer/illustrations.svelte';

  export let blok: PreFooterStoryblok;
  $: ({ title } = blok);
</script>

<section class="w-full overflow-hidden">
  <div class="relative mx-auto flex max-w-container flex-col items-center justify-center">
    {#if title?.[0]}
      <Title data={title[0]} class="px-20 pb-0 pt-48 lg:px-0" titleClass="lg:max-w-[744px]" />
    {/if}

    <!-- Illustrations -->
    <Illustrations />
  </div>
</section>
