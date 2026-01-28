<script lang="ts">
  import type { CompanyItemsStoryblok } from '$types/bloks';

  import { getImageAttributes } from '$lib/utils/cms';

  export let blok: CompanyItemsStoryblok;
  $: ({ items } = blok);
</script>

<section class="relative isolate overflow-hidden">
  <div class="relative flex w-full flex-col px-20 lg:px-48">
    {#if items?.length}
      <div class="flex flex-wrap gap-48 pb-48 pt-55">
        {#each items as { illustration, title, description }}
          <div
            class="mx-auto flex flex-col items-center gap-46 overflow-hidden xs:basis-full sm:max-w-300 sm:basis-300"
          >
            {#if illustration}
              {@const { src, alt } = getImageAttributes(illustration)}
              <img
                {src}
                {alt}
                class="aspect-auto max-h-[185px] w-auto max-w-[232px] shrink-0 self-center md:self-start"
              />
            {/if}

            <div class="text-md/relaxed tracking-wide text-foreground">
              <p class="font-medium">{title}</p>
              <p class="mt-6 opacity-70">{description}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
