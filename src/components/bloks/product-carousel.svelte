<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';
  import type { ProductCarouselStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/strings/utils';

  import Title from '$components/title.svelte';
  import MobileCarousel from '$components/product-carousel/mobile-carousel.svelte';

  export let blok: ProductCarouselStoryblok;
  $: ({ title, delay, features } = blok);

  let currentIndex = 0;
  let interval: NodeJS.Timeout;

  let imagesListContainer: HTMLDivElement;
  let titlesListContainer: HTMLDivElement;
  let numbersListContainer: HTMLDivElement;
  let horizontalItemsContainer: HTMLDivElement;

  $: carouselDelay = delay ? Number(delay) : 5000;
  let isMobile = false;

  function updateIsMobile() {
    isMobile = browser ? window.innerWidth < 1024 : false;
  }

  function scrollToNextImage() {
    let gap = 40;

    if (currentIndex === features.length - 1) {
      gap = 100;
    }

    const top = (554 + gap) * currentIndex;
    imagesListContainer.scrollTo({ top, behavior: 'smooth' });
  }

  function centerVerticalItem(index: number, list: HTMLDivElement) {
    const item = list.children[index] as HTMLElement;

    if (!item) return;

    const listHeight = list.clientHeight;
    const itemHeight = item.clientHeight;
    const itemTop = item.offsetTop;
    const itemCenter = itemTop + itemHeight / 2;
    const scrollPosition = itemCenter - listHeight / 2;

    const maxScrollTop = list.scrollHeight - listHeight;

    list.scrollTo({
      top: Math.min(Math.max(scrollPosition, 0), maxScrollTop),
      behavior: 'smooth'
    });
  }

  function centerHorizontalItem(index: number) {
    if (!horizontalItemsContainer) return;
    const item = horizontalItemsContainer.children[index] as HTMLElement;

    if (!item) return;

    const itemLeft = item.offsetLeft;

    horizontalItemsContainer.scrollTo({
      left: itemLeft,
      behavior: 'smooth'
    });
  }

  function handleResize() {
    updateIsMobile();

    clearInterval(interval);
    currentIndex = 0;

    scrollToNextImage();
    centerVerticalItem(currentIndex, numbersListContainer);
    centerVerticalItem(currentIndex, titlesListContainer);

    centerHorizontalItem(currentIndex);

    startAutoScroll();
  }

  function handleItemClick(index: number) {
    currentIndex = index;

    clearInterval(interval);
    startAutoScroll();

    scrollToNextImage();
    centerVerticalItem(currentIndex, numbersListContainer);
    centerVerticalItem(currentIndex, titlesListContainer);

    centerHorizontalItem(currentIndex);
  }

  function startAutoScroll() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % features.length;

      scrollToNextImage();
      centerVerticalItem(currentIndex, numbersListContainer);
      centerVerticalItem(currentIndex, titlesListContainer);

      centerHorizontalItem(currentIndex);
    }, carouselDelay);
  }

  onMount(() => {
    updateIsMobile();
    if (currentIndex !== null) {
      scrollToNextImage();
      centerVerticalItem(currentIndex, numbersListContainer);
      centerVerticalItem(currentIndex, titlesListContainer);

      centerHorizontalItem(currentIndex);
    }

    if (browser) {
      window.addEventListener('resize', handleResize);
      imagesListContainer.style.overflow = 'hidden';
    }

    startAutoScroll();

    return () => clearInterval(interval);
  });

  onDestroy(() => {
    updateIsMobile();
    clearInterval(interval);

    if (browser) window.removeEventListener('resize', handleResize);
  });
</script>

<section class="relative isolate mb-80 flex w-full overflow-hidden">
  <!-- Top Fade -->
  <span
    role="presentation"
    class="pointer-events-none absolute -top-1 left-0 z-20 hidden h-64 w-full bg-gradient-to-b from-background to-transparent lg:block"
  />

  <!-- Bottom Fade -->
  <span
    role="presentation"
    class="pointer-events-none absolute bottom-0 left-0 z-20 hidden h-64 w-full bg-gradient-to-t from-background to-transparent lg:block"
  />

  <div class="relative flex max-w-container flex-col lg:mx-auto lg:flex-row">
    <div class="flex w-full flex-col items-start">
      {#if title?.[0]}
        <Title
          data={title[0]}
          class="flex px-20 pb-32 pt-48 lg:p-48 lg:pr-0 lg:pt-80"
          titleClass="lg:min-w-[532px]"
        />
      {/if}

      {#if features.length > 0}
        <!-- Desktop -->
        <div
          class="relative isolate hidden items-center justify-center gap-36 self-end pl-48 lg:flex"
        >
          <!-- Top Fade -->
          <span
            role="presentation"
            class="pointer-events-none absolute left-0 top-0 z-40 h-1/2 w-full bg-gradient-to-b from-background to-transparent"
          />

          <!-- Bottom Fade -->
          <span
            role="presentation"
            class="pointer-events-none absolute bottom-0 left-0 z-40 h-1/2 w-full bg-gradient-to-t from-background to-transparent"
          />

          <div
            class="relative flex h-full min-h-[368px] flex-col items-center justify-center gap-32"
          >
            <span class="vertical-dashed-border absolute left-1/2 z-10 h-full w-1" />

            <!-- Top Line Fade -->
            <span
              role="presentation"
              class="pointer-events-none absolute left-1/2 top-0 z-20 h-1/4 w-1 bg-gradient-to-b from-background to-transparent"
            />

            <!-- Bottom Line Fade -->
            <span
              role="presentation"
              class="pointer-events-none absolute bottom-0 left-1/2 z-20 h-1/4 w-1 bg-gradient-to-t from-background to-transparent"
            />

            <div
              class="relative flex max-h-[368px] flex-col gap-32 overflow-y-auto py-[184px] hide-scrollbar"
              bind:this={numbersListContainer}
            >
              {#each Array(features.length) || [] as _, i}
                <button
                  on:click={() => handleItemClick(i)}
                  class={cn(
                    'before:rounded-full: z-50 flex size-32 flex-shrink-0 items-center justify-center rounded-full transition-all before:absolute before:-z-10 before:h-32 before:w-32 before:rounded-full before:border before:border-highlight before:bg-[hsl(var(--color-highlight-secondary))] after:absolute after:z-50 after:h-32 after:w-32 after:rounded-full after:bg-background',
                    i === currentIndex
                      ? 'before:border-opacity-100 after:opacity-0'
                      : 'before:border-opacity-8 after:opacity-48'
                  )}
                >
                  <p
                    class="mt-2 text-sm/snug font-medium text-highlight-foreground text-opacity-80"
                  >
                    {i + 1}
                  </p>
                </button>
              {/each}
            </div>
          </div>

          <div
            bind:this={titlesListContainer}
            class="pointer-events-none relative flex max-h-[368px] flex-col overflow-y-hidden scroll-smooth hide-scrollbar"
          >
            {#each features as { title, description }}
              <div
                class={cn(
                  'flex min-h-[368px] max-w-[463px] flex-col justify-center gap-14 pt-[60px] text-foreground'
                )}
              >
                <p class="font-serif text-2xl">{title}</p>
                <p class="opacity-80">{description}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Carousel -->
    {#if features?.length}
      <div
        class="point-events-none hidden h-[762px] w-full min-w-[888px] translate-x-128 flex-col items-center gap-40 overflow-auto overscroll-none py-104 transition-all ease-in-out hide-scrollbar lg:flex"
        bind:this={imagesListContainer}
      >
        {#each features as { media, loop }, i}
          {@const { src } = getImageAttributes(media)}
          <div
            class={cn(
              'hidden aspect-auto max-h-[554px] min-h-[554px] w-[843px] overflow-hidden rounded-3xl border border-foreground transition-all duration-500 ease-in-out lg:block',
              currentIndex === i ? 'w-[888px]' : 'w-[843px] opacity-8'
            )}
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
              <img {src} alt="" class="h-full w-full object-cover" />
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

{#if isMobile}
  <MobileCarousel
    {features}
    {currentIndex}
    bind:horizontalItemsContainer
    on:clickCarouselItem={(e) => {
      handleItemClick(e.detail.i);
    }}
  />
{/if}
