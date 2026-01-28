<script lang="ts">
  import type { TeamStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/strings/utils';

  import Video from '$components/video.svelte';
  import Title from '$components/title.svelte';
  import HalfMoon1 from '$components/team/assets/half-moon-1.webp';
  import HalfMoon2 from '$components/team/assets/half-moon-2.webp';

  export let blok: TeamStoryblok;
  $: ({ title, media, loop } = blok);
</script>

<section class="relative isolate overflow-hidden bg-highlight-secondary">
  <div
    class="relative flex w-full flex-col items-center justify-between gap-24 px-20 pb-24 xl:mx-auto xl:max-w-container xl:flex-row xl:items-center xl:gap-200 xl:px-0 xl:pb-[111px] xl:pt-[89px]"
  >
    {#if title?.[0]}
      <Title data={title[0]} class="w-full self-start py-16 xl:min-w-[500px] xl:pl-48" />
    {/if}

    {#if media}
      {@const { src, alt } = getImageAttributes(media)}
      <div class="relative w-full">
        <div
          class="bottom- pointer-events-none absolute -right-[200px] -top-[26px] -z-10 w-[260px] md:-right-[260px] md:-top-[50px] md:w-[400px] xl:-left-[160px] xl:-top-[40px] xl:w-[428px] xl:max-w-[428px]"
        >
          <img role="presentation" src={HalfMoon1} alt="" />
        </div>

        <div
          class="pointer-events-none absolute -bottom-[120px] -left-[60px] -z-10 h-full w-[260px] rotate-[10deg] md:-bottom-[300px] md:-left-[80px] md:w-[360px] lg:-bottom-[500px] xl:-bottom-[400px] xl:left-[300px] xl:w-[500px] xl:rotate-0"
        >
          <img role="presentation" src={HalfMoon2} alt="" />
        </div>

        <div
          class={cn(
            'aspect-auto w-full translate-x-[0px] overflow-hidden rounded-3xl border border-foreground xl:min-w-[843px]'
          )}
        >
          {#if VIDEO_EXTENSIONS.includes(getFileExtension(media.filename))}
            <Video video={media} {loop} videoClass="rounded-none" />
          {:else}
            <img {src} {alt} class="h-full w-full object-cover" />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>
