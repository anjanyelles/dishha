<script lang="ts">
  import type { IntegrationsStoryblok } from '$types/bloks';
  import { createInfiniteQuery } from '@tanstack/svelte-query';

  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';
  import { sumArray } from '$lib/utils/array';
  import { getIntegrations } from '$lib/storyblok';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { IntegrationEntry } from '$lib/stories';
  import { createDebouncedValue } from '$lib/stores/debouncedValue';

  import Title from '$components/title.svelte';
  import Input from '$components/ui/input.svelte';
  import LoadMore from '$components/directory/load-more.svelte';
  import NoResults from '$components/directory/no-results.svelte';
  import IntegrationSkeleton from '$components/skeletons/integration-skeleton.svelte';

  export let blok: IntegrationsStoryblok;
  $: ({ type, title } = blok);

  const [search, debouncedSearch] = createDebouncedValue('');
  let previousData: { integrations: IntegrationEntry[]; total: number }[] | undefined;

  $: query = createInfiniteQuery<{ integrations: IntegrationEntry[]; total: number }>({
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryKey: ['integrations', { id: 'integrations', search: $debouncedSearch }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getIntegrations({
        per_page: 18,
        search_term: $debouncedSearch,
        page: Number(pageParam),
        filter_query: {
          type: { in: type }
        }
      });

      return { integrations: res.data.stories, total: res.total };
    },
    getNextPageParam: (prev, pages) => {
      const dataLength = sumArray(pages, (page) => page.integrations.length);
      if (dataLength < prev.total) {
        return pages.length + 1;
      }

      return undefined;
    }
  });

  $: hasResults = !!$query.data?.pages.some((page) => page.integrations.length > 0);

  // Keep previous data
  $: if ($query.data?.pages) {
    previousData = $query.data?.pages;
  }
</script>

<section class="overflow-hidden">
  <div class="relative mx-auto flex max-w-container flex-col">
    <div class="space-y-24 px-20 py-48 md:p-48 md:pr-0">
      {#if title?.[0]}
        <Title data={title[0]} class="" titleClass="w-full max-w-[532px]" />

        <Input
          loading={$query.isLoading}
          id="integrations-search"
          icon="search"
          bind:value={$search}
          placeholder={string('searchPlaceholder')}
          class="max-w-[415px]"
        />
      {/if}
    </div>

    {#if !$query.isLoading && !hasResults}
      <NoResults
        title={string('noResultsIntegrations.title')}
        description={string('noResultsIntegrations.description')}
        class="px-20 py-48"
      />
    {/if}

    <div class={cn('relative isolate grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3')}>
      <span
        class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-30 border border-background"
      />
      {#if $query.isLoading && !hasResults}
        {#each Array(18) as _}
          <IntegrationSkeleton class="m-20 md:m-48" />
        {/each}
      {/if}

      {#if $query.data?.pages}
        {#each $query.data?.pages as page}
          {#each page.integrations || previousData || [] as integration}
            {@const { logo, title, description } = integration.content}
            {@const { src, alt } = getImageAttributes(logo)}

            <div
              class={cn(
                'relative z-20 w-full space-y-20 border-b border-r border-foreground border-opacity-[0.02] p-20 py-48 md:p-48'
              )}
            >
              <div
                class="flex size-64 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[hsl(var(--color-foreground)/0.08)] bg-background"
              >
                <img {src} {alt} />
              </div>

              <div class="space-y-6 text-md/relaxed tracking-wide text-foreground">
                {#if title}
                  <p class="font-medium">{title}</p>
                {/if}

                {#if description}
                  <p class="opacity-70">{description}</p>
                {/if}
              </div>
            </div>
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
        class="py-48"
      />
    {/if}
  </div>
</section>
