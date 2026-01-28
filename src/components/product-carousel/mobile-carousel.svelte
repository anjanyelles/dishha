<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { FeatureDetailStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/strings/utils';

  const dispatch = createEventDispatcher();

  export let currentIndex: number = 0;
  export let features: FeatureDetailStoryblok[];
  export let horizontalItemsContainer: HTMLDivElement;
</script>

<div
  bind:this={horizontalItemsContainer}
  class="relative isolate flex w-full snap-x snap-mandatory overflow-x-auto pb-24 hide-scrollbar lg:hidden"
>
  {#each features as { title, description, media, loop }, i}
    {@const { src } = getImageAttributes(media)}
    <div>
      <button
        on:click={() =>
          dispatch('clickCarouselItem', {
            i
          })}
        class={cn(
          'relative flex h-full w-[calc(100vw-40px)] flex-none cursor-pointer flex-col items-start justify-between gap-24 pl-20 pr-20 lg:hidden'
        )}
      >
        <span
          class="horizontal-dashed-border absolute left-0 top-16 -z-10 h-1 w-[calc(100%-16px)] translate-x-32"
        />

        <div>
          <div
            class={cn(
              'before:rounded-full: z-50 flex size-32 flex-shrink-0 items-center justify-center rounded-full transition-all before:absolute before:-z-10 before:h-32 before:w-32 before:rounded-full before:border before:border-highlight before:bg-[hsl(var(--color-highlight-secondary))] after:absolute after:z-50 after:h-32 after:w-32 after:rounded-full after:bg-background',
              i === currentIndex
                ? 'before:border-opacity-100 after:opacity-0'
                : 'before:border-opacity-8 after:opacity-48'
            )}
          >
            <p class="text-sm/snug font-medium text-highlight-foreground text-opacity-80">
              {i + 1}
            </p>
          </div>

          <div class="mt-22 flex flex-col gap-4 text-start text-foreground">
            <p class="font-serif text-xl">{title}</p>
            <p class="text-md opacity-70">{description}</p>
          </div>
        </div>

        <div
          class="mt-auto w-full overflow-hidden rounded-3xl border border-foreground transition-all duration-500 ease-in-out lg:hidden"
        >
          {#if VIDEO_EXTENSIONS.includes(getFileExtension(media.filename))}
            <video
              class="aspect-auto size-full bg-background object-cover"
              muted
              src={media.filename}
              {loop}
              autoplay
              playsinline
            />
          {:else}
            <img
              {src}
              alt=""
              class="max-h-[221px] min-h-[221px] w-full object-cover md:max-h-[442px]"
            />
          {/if}
        </div>
      </button>
    </div>
  {/each}
</div>
