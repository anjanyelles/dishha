<script lang="ts">
  import type { TimelineStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import TimelineIllustration from '$components/timeline/assets/timeline-illustration.webp';

  export let blok: TimelineStoryblok;
  $: ({ dates } = blok);
</script>

<section class="relative isolate overflow-hidden">
  <div
    class="relative mx-auto mt-80 flex w-full max-w-container flex-col overflow-hidden lg:mt-[170px]"
  >
    {#if dates?.length}
      <div
        class="dark-scroll-bar snap-x snap-mandatory scroll-ps-40 items-start overflow-auto overflow-y-hidden xl:pl-48"
      >
        <div class="flex w-full gap-98">
          {#each dates as { title, description }}
            <div
              class={cn(
                'relative flex translate-x-20 snap-start snap-always gap-31 pb-[595px] last:pr-98 xl:translate-x-50'
              )}
            >
              <div class="isolate">
                <span
                  class="absolute -left-[2.5px] top-20 z-20 size-6 rounded-full bg-foreground"
                />
                <span class="vertical-dashed-border absolute left-0 top-20 z-10 h-[1000px] w-1" />
              </div>

              <div class="flex w-[316px] flex-col gap-8 font-normal text-foreground">
                <p class="font-serif text-2xl/tight">{title}</p>
                <p class="text-md/relaxed tracking-wide opacity-70">{description}</p>
              </div>
            </div>
          {/each}
        </div>
        <img
          alt=""
          role="presentation"
          src={TimelineIllustration}
          class="pointer-events-none bottom-0 left-0 z-30 -mt-[1200px] min-w-[2370px] -translate-x-26 self-start lg:left-0 lg:translate-x-0"
        />
      </div>
    {/if}
  </div>
</section>

<style>
  .dark-scroll-bar {
    color-scheme: dark;
  }
</style>
