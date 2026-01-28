<script lang="ts">
  import { storyblokEditable } from '@storyblok/svelte';
  import type { CompanyItemStoryblok } from '$types/bloks';

  import { getImageAttributes } from '$lib/utils/cms';

  export let data: CompanyItemStoryblok;
  $: ({ illustration, title, description } = data);
</script>

<div
  use:storyblokEditable={data}
  class="mx-auto flex flex-1 basis-[480px] flex-col items-center overflow-hidden"
>
  {#if illustration}
    {@const { src, alt } = getImageAttributes(illustration)}
    <img {src} {alt} class="max-h-[220px] w-full max-w-[360px] shrink-0" />
  {/if}

  <div class="px-0 py-32 text-md/relaxed tracking-wide text-foreground lg:px-48">
    <p class="font-medium">{title}</p>
    <p class="mt-6 opacity-70">{description}</p>
  </div>
</div>
