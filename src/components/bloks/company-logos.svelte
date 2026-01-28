<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { CompanyLogosStoryblok } from '$types/bloks';

  export let blok: CompanyLogosStoryblok;
  $: ({ title, logos } = blok);
</script>

<section class="overflow-hidden pb-60 pt-36">
  <div
    class="relative flex w-full flex-col items-center justify-center px-20 lg:container lg:mx-auto"
  >
    {#if title}
      <p class="text-center text-md/normal font-medium tracking-wide text-foreground opacity-70">
        {title}
      </p>
    {/if}
  </div>

  <div
    class="mt-24 flex w-full items-center justify-start gap-20 overflow-auto px-20 md:justify-center lg:gap-40 lg:px-0"
  >
    {#each logos as logo}
      {@const { src, alt } = getImageAttributes(logo)}
      <div class="max-h-56 max-w-[142px] flex-shrink-0">
        <img {src} {alt} class="h-full w-full" />
      </div>
    {/each}
  </div>
</section>
