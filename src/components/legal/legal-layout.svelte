<script lang="ts" context="module">
  const isLegalPage = (story: ISbStoryData): story is ISbStoryData<LegalStoryblok> => {
    return story.content.component === 'legal';
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy, onMount } from 'svelte';

  import type { ISbStoryData } from '@storyblok/js';
  import type { LegalStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { smallDesktop } from '$lib/utils/media';
  import { createMediaStore } from '$lib/stores/media';

  import Sticky from '$components/sticky.svelte';
  import Sidebar from '$components/sidebar.svelte';
  import Tabs from '$components/ui/tabs/tabs.svelte';
  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';
  import RichTextRenderer from '$components/rich-text/rich-text-renderer.svelte';

  const isMobile = createMediaStore(smallDesktop);

  let headings: HTMLHeadingElement[] = [];
  let document = typeof window !== 'undefined' ? window.document : null;
  let windowScroll = 0;

  let activeTab = 0;

  const getAllHeadings = () => {
    if (!document) {
      return;
    }

    const content = document.getElementById('content');
    if (!content) {
      return;
    }

    headings = Array.from(content.querySelectorAll('h2'));

    // For old blog posts: if we dont have H2s we use H3s for the Sidebar
    if (headings.length === 0) headings = Array.from(content.querySelectorAll('h3'));
  };

  const onScrollIntoView = (e: CustomEvent) => {
    const heading = e.detail.i as HTMLHeadingElement;

    const topGap = isMobile ? 120 : 0;

    const top = heading.getBoundingClientRect().top + window.scrollY - topGap;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const progressForContent = () => {
    if (!document) {
      return;
    }

    /** Detect end of content block and make hasReachEndOfContent true */
    const content = document.getElementById('content');
    if (!content) {
      return;
    }

    headings.forEach((heading: HTMLHeadingElement, i: number) => {
      const headingTop = heading.offsetTop;
      const nextHeadingOffsetTop = i === headings.length - 1 ? 0 : headings[i + 1].offsetTop;

      if (
        (i === headings.length - 1 && windowScroll >= headingTop - 300) ||
        (windowScroll >= headingTop - 100 && windowScroll <= nextHeadingOffsetTop)
      ) {
        activeTab = i;
      }
    });
  };

  onMount(() => {
    getAllHeadings();
    progressForContent();

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', progressForContent);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', progressForContent);
    }
  });

  export let blok: LegalStoryblok;
  $: ({ content, highlight_card, body } = blok);

  $: story = $page.data.story;
</script>

<svelte:window bind:scrollY={windowScroll} />

{#if story && isLegalPage(story)}
  <article data-theme={story.content.theme || 'aqua'} class="overflow-clip bg-background">
    <slot />

    <div
      class={cn(
        'relative grid grid-cols-1 xl:container xl:mx-auto xl:gap-16',
        headings.length
          ? 'xl:max-w-container xl:grid-cols-[1fr_minmax(auto,648px)_1fr]'
          : 'xl:max-w-richtext'
      )}
    >
      {#if headings.length}
        {@const parsedTabsFeatures = headings.map(({ innerText }, i) => ({
          id: i,
          label: innerText
        }))}
        <Sidebar {headings} {activeTab} on:scrollIntoView={onScrollIntoView} />

        <Sticky class="bg-background xl:hidden">
          <div class="w-full overflow-auto">
            <Tabs
              {activeTab}
              options={parsedTabsFeatures}
              on:optionSelect={(e) => {
                activeTab = e.detail.i;
                e.detail.i = headings[activeTab];
                onScrollIntoView(e);
              }}
            />
          </div>
        </Sticky>
      {/if}

      <!-- Richtext -->

      <div
        id="content"
        class="relative mx-auto w-full self-start px-20 md:max-w-richtext md:px-0 xl:mx-0 xl:items-start xl:px-0"
      >
        {#if content?.content}
          {#each content?.content as b}
            <RichTextRenderer doc={b} />
          {/each}
        {/if}
      </div>
    </div>

    <!-- Highlight Card -->
    {#if highlight_card && highlight_card.length > 0}
      {#each highlight_card as b}
        <DynamicBlok blok={b} />
      {/each}
    {/if}

    <!-- Other bloks -->
    {#if body && body.length > 0}
      {#each body as b}
        <DynamicBlok blok={b} />
      {/each}
    {/if}
  </article>
{/if}
