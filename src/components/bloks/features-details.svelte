<script lang="ts">
  import { storyblokEditable } from '@storyblok/svelte';
  import type { FeaturesDetailsStoryblok } from '$types/bloks';

  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/strings/utils';

  import Title from '$components/title.svelte';

  export let blok: FeaturesDetailsStoryblok;
  $: ({ title, details } = blok);
</script>

<section class="relative isolate overflow-hidden">
  <div class="relative flex w-full flex-col lg:mx-auto xl:max-w-container">
    {#if title?.[0]}
      <Title data={title[0]} class="w-full px-20 py-48 xl:ml-160 xl:mr-0 xl:pl-0" />
    {/if}

    {#if details?.length}
      <div
        class="flex w-full flex-wrap items-center justify-start gap-48 px-20 pb-72 xl:ml-160 xl:px-0"
      >
        {#each details as detail}
          {@const { media, title, description, loop } = detail}
          {@const { alt, src } = getImageAttributes(media)}
          <div
            class="flex basis-[532px] flex-col gap-24 overflow-hidden"
            use:storyblokEditable={detail}
          >
            <div
              class="relative aspect-auto overflow-hidden rounded-24 border border-highlight-foreground border-opacity-8 bg-background"
            >
              {#if VIDEO_EXTENSIONS.includes(getFileExtension(media.filename))}
                <video
                  class="aspect-auto h-full w-full bg-background object-cover"
                  muted
                  src={media.filename}
                  {loop}
                  autoplay
                  playsinline
                />
              {:else}
                <img {src} {alt} class="aspect-auto h-full w-full object-cover" />
              {/if}
            </div>
            <div
              class="flex max-w-[426px] flex-col gap-6 text-md/relaxed -tracking-wide text-foreground"
            >
              <p class="font-medium">{title}</p>
              <p class="opacity-70">{description}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
