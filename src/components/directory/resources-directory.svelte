<script lang="ts">
  import { page } from '$app/stores';
  import type { ISbStoryData } from '@storyblok/svelte';
  import { createInfiniteQuery } from '@tanstack/svelte-query';

  import type { FilterQuery } from '$types/cms';
  import type { ResourceStoryblok } from '$types/bloks';

  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';
  import { tablet } from '$lib/utils/media';
  import { sumArray } from '$lib/utils/array';
  import { getResources } from '$lib/storyblok';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { getValidTheme } from '$lib/utils/themes';
  import type { ResourceEntry } from '$lib/stories';
  import { createMediaStore } from '$lib/stores/media';
  import { createDebouncedValue } from '$lib/stores/debouncedValue';

  import Filters from './filters.svelte';
  import Card from '$components/ui/card/card.svelte';
  import LoadMore from '$components/directory/load-more.svelte';
  import { getResourceIcon } from '$components/bloks/resource.svelte';
  import CardSkeleton from '$components/skeletons/card-skeleton.svelte';
  import DirectoryLayout from '$components/directory/directory-layout.svelte';

  import Squares from './assets/squares.webp';
  import NoResults from './no-results.svelte';
  import { urlResourceFilters } from '$lib/stores/url-resource-filters';
  import { navbarInfo } from '$components/topnav/topnav.svelte';

  let contentRef: HTMLDivElement;
  export let id: string;

  let filter_query: FilterQuery<'type'>;
  let previousData: { resources: ResourceEntry[]; total: number }[] | undefined;

  const isMobile = createMediaStore(tablet);
  const [search, debouncedSearch] = createDebouncedValue('');

  $: topics = $page.data.topics as { name: string; value: string }[];

  const getTag = (key: string) => {
    return topics.find((topic) => key === topic?.value)?.name;
  };

  const parseResourceItem = (item: ISbStoryData<ResourceStoryblok>) => {
    return {
      theme: getValidTheme(item.content.theme) || 'lilac',
      image:
        item.content.cover !== undefined && item.content.filename !== ''
          ? item.content.cover
          : undefined,
      type: item.content.type,
      title: item.name,
      tag: item.content.topic ? getTag(item.content.topic.toString()) : undefined,
      href: sanitizeSlug(item.full_slug) as string
    };
  };

  $: typeFilters = $urlResourceFilters
    .map((item) => item['type'])
    .filter((item) => item)
    .toString();

  $: topicFilters = $urlResourceFilters
    .filter((item) => item['topic'])
    .map((item) => item['topic'])
    .toString();

  $: filter_query = {
    type: typeFilters ? { in: typeFilters } : null,
    topic: topicFilters ? { in: topicFilters } : null
  };

  $: query = createInfiniteQuery<{ resources: ResourceEntry[]; total: number }>({
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryKey: ['resources', { id, filter_query, search: $debouncedSearch }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getResources({
        per_page: 12,
        search_term: $debouncedSearch,
        filter_query,
        page: Number(pageParam)
      });

      return { resources: res.data.stories, total: res.total };
    },
    getNextPageParam: (prev, pages) => {
      const dataLength = sumArray(pages, (page) => page.resources.length);
      if (dataLength < prev.total) {
        return pages.length + 1;
      }

      return undefined;
    }
  });

  $: hasResults = !!$query.data?.pages.some((page) => page.resources.length > 0);

  // Keep previous data
  $: if ($query.data?.pages) {
    previousData = $query.data?.pages;
  }

  $: scrollToTop = () => {
    const top =
      window?.scrollY + contentRef?.getBoundingClientRect().top - ($navbarInfo?.rect.height || 65);
    if (contentRef?.getBoundingClientRect().top - ($navbarInfo?.rect.height || 65) < 0) {
      window.requestAnimationFrame(() => window.scrollTo({ top: top - 48, behavior: 'smooth' }));
    }
  };
</script>

<DirectoryLayout on:submit={scrollToTop}>
  <aside
    slot="aside"
    class="relative h-full flex-1 px-20 pt-16 md:max-w-[348px] md:pr-48 md:pt-48 xl:px-48"
  >
    <!-- Divider -->
    <span class={cn('vertical-dashed-border absolute right-0 top-0 hidden h-full w-1 md:block')} />

    <!-- Top Divider Gradient -->
    <span
      role="presentation"
      class={cn(
        'absolute right-0 top-0 z-10 hidden h-200 w-1 bg-gradient-to-b from-background to-transparent lg:block'
      )}
    />

    <!-- Bottom Divider Gradient -->
    <span
      role="presentation"
      class={cn(
        'absolute bottom-0 right-0 z-10 hidden h-200 w-1 bg-gradient-to-t from-background to-transparent lg:block'
      )}
    />

    <!-- Header -->
    <div class="flex flex-col gap-24">
      <slot name="header" />
    </div>

    <!-- Filters -->
    <Filters
      bind:topics
      bind:search={$search}
      loading={$query.isLoading}
      class="pt-24 lg:gap-14 lg:pt-56"
    />

    <img src={Squares} alt="" class="mt-26 hidden size-full shrink-0 lg:block" />
  </aside>

  <div
    bind:this={contentRef}
    slot="directory"
    class="relative flex w-full flex-1 flex-col items-center justify-center gap-56 px-20 pb-56 pt-58 md:justify-start md:px-0 lg:pt-80"
  >
    {#if !$query.isLoading && !hasResults}
      <NoResults
        title={string('noResults.title')}
        description={string('noResults.description')}
        class="mt-60 xl:mt-[160px]"
      />
    {/if}

    <div
      class="flex w-full grid-cols-1 flex-col items-center gap-x-28 gap-y-80 md:grid lg:grid-cols-2 xl:grid-cols-3"
    >
      {#if $query.isLoading && !hasResults}
        {#each Array(12) as _}
          <CardSkeleton />
        {/each}
      {/if}

      {#if $query.data?.pages}
        {#each $query.data?.pages as page}
          {#each page.resources || previousData || [] as resource}
            {@const { theme, tag, image, title, href, type } = parseResourceItem(resource)}
            {@const label = `${string('read')} ${type}`}
            <Card
              {tag}
              {type}
              {href}
              {title}
              {image}
              size="sm"
              class="w-fit"
              hasBackCard
              backCardColor={theme}
              contentCardStyle="mr-26"
              backCardStyle={cn(
                'left-20 rotate-back-card-default',
                $isMobile ? 'max-w-[272px]' : 'max-w-[344px]'
              )}
              cta={{ icon: getResourceIcon(type), label }}
            />
          {/each}
        {/each}
      {/if}
    </div>

    {#if $query.hasNextPage}
      <LoadMore
        loading={$query.isFetchingNextPage}
        on:loadMore={() => {
          $query.fetchNextPage();
        }}
      />
    {/if}
  </div>
</DirectoryLayout>
