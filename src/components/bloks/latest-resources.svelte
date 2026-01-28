<script lang="ts">
  import { page } from '$app/stores';
  import { createQuery } from '@tanstack/svelte-query';
  import type { ISbStoryData } from '@storyblok/svelte';

  import type { LatestResourcesStoryblok, ResourceStoryblok } from '$types/bloks';

  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';
  import { tablet } from '$lib/utils/media';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { createMediaStore } from '$lib/stores/media';
  import { fetchLatestResources } from '$lib/storyblok';
  import { getAccentTheme, getValidTheme } from '$lib/utils/themes';

  import Title from '$components/title.svelte';
  import Card from '$components/ui/card/card.svelte';
  import { getResourceIcon } from '$components/bloks/resource.svelte';

  const parseItem = (item: ISbStoryData<ResourceStoryblok>) => {
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

  export let blok: LatestResourcesStoryblok;

  const isMobile = createMediaStore(tablet);

  const isDraft = $page.data.version === 'draft';
  const query = createQuery({
    queryKey: ['latestResources'],
    queryFn: () => fetchLatestResources({ version: isDraft ? 'draft' : 'published' })
  });

  $: ({ title } = blok);
  $: resources = $query.data;
  $: topics = $page.data.topics as { name: string; value: string }[];
  $: story = $page.data.story;

  const getTag = (key: string) => {
    return topics.find((topic) => key === topic?.value)?.name;
  };
</script>

<section class="overflow-hidden">
  <div class="relative flex flex-col items-center md:mx-auto xl:max-w-container">
    {#if title?.[0]}
      <Title data={title[0]} class="px-20 pb-40 pt-80 md:mx-auto xl:px-0" />
    {/if}

    {#if resources?.length}
      <div
        data-theme={getAccentTheme(story?.content?.theme) || 'orange'}
        class="mt-80 flex flex-wrap items-center justify-center gap-80 gap-y-140 px-20 pb-80 md:flex-row lg:mt-60 lg:gap-y-80 xl:gap-100 xl:px-48"
      >
        {#each resources as resource, i}
          {@const { theme, tag, image, title, href, type } = parseItem(resource)}
          {@const animation = 'transition duration-300 ease-in-out'}
          <Card
            {tag}
            {type}
            {href}
            {title}
            {image}
            size={$isMobile ? 'sm' : 'md'}
            hasBackCard
            backCardColor={theme}
            cta={{ icon: getResourceIcon(type), label: `${string('read')} ${type}` }}
            class={cn(animation, 'group-hover:translate-y-40 group-focus:translate-y-40')}
            backCardStyle={cn(
              animation,
              i === 0 &&
                'group-hover:-translate-y-80 group-focus:-translate-y-80 rotate-back-card-default',
              i === 1 &&
                'left-30 transform -top-36 -rotate-[2deg] group-hover:rotate-4 group-hover:-translate-y-24 group-focus:rotate-4 group-focus:-translate-y-24',
              i === 2 &&
                'left-40 transform -top-30 -rotate-[4deg] group-hover:rotate-4 group-hover:-translate-y-40 group-focus:rotate-[4deg] group-focus:-translate-y-40'
            )}
          />
        {/each}
      </div>
    {/if}
  </div>
</section>
