<script lang="ts">
  import { page } from '$app/stores';
  import type { BoxCardsStoryblok } from '$types/bloks';

  import Title from '$components/title.svelte';
  import PostIt from '$components/post-it.svelte';
  import BoxCard from '$components/box-card.svelte';

  import { cn } from '$lib/utils/tailwind';
  import { tablet } from '$lib/utils/media';
  import { isCmsStory } from '$lib/utils/cms';
  import { customerStories } from '$lib/content';
  import { createMediaStore } from '$lib/stores/media';

  export let blok: BoxCardsStoryblok;
  $: ({ title, cards, post_it: postIt } = blok);

  const isMobile = createMediaStore(tablet);
</script>

<section class="bg-background">
  <div
    class={cn(
      'flex h-full w-full flex-col pb-72 xl:container xl:mx-auto xl:max-w-container',
      postIt?.[0] && 'xl:flex-row xl:px-48 xl:pb-0'
    )}
  >
    <div
      class={cn(
        'px-20',
        postIt?.[0]
          ? 'flex w-full flex-col items-start justify-between pb-48 xl:max-w-[697px] xl:px-0'
          : 'xl:container xl:mx-auto xl:px-48'
      )}
    >
      {#if title && title[0]}
        <Title data={title[0]} class="py-48" />
      {/if}

      {#if postIt && postIt[0]}
        {@const { type, quote, customer_story } = postIt[0]}
        {@const customerStory =
          typeof customer_story === 'string'
            ? $customerStories?.find((item) => item.uuid === customer_story)
            : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

        {@const author =
          customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
            ? customerStory?.content?.customer.content
            : undefined}
        <div
          data-theme={author ? undefined : $page?.data?.story?.content?.theme}
          class="z-10 self-center pb-48 xl:self-start"
        >
          <PostIt {type} {quote} {author} {customerStory} size={$isMobile ? 'small' : 'medium'} />
        </div>
      {/if}
    </div>

    {#if cards && cards.length}
      <div class="relative w-full xl:container xl:mx-auto">
        <!-- Top or Left Fade -->
        <span
          role="presentation"
          class={cn(
            'pointer-events-none absolute left-0 top-0 z-10 h-full w-[20px] bg-gradient-to-r from-background to-transparent',
            postIt?.[0] && 'xl:h-[100px] xl:w-full xl:bg-gradient-to-b'
          )}
        />

        <!-- Top or Left dashed line -->
        <span
          class={cn(
            'horizontal-dashed-border pointer-events-none absolute top-0 h-1 w-full',
            postIt?.[0] && 'xl:vertical-dashed-border xl:left-0 xl:h-full xl:w-1'
          )}
        />

        <div
          class={cn(
            'flex flex-wrap px-20',
            postIt?.[0]
              ? 'xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-0 xl:px-0 xl:py-72'
              : 'xl:container xl:mx-auto xl:px-48'
          )}
        >
          {#each cards as card, i}
            {@const { title, description, link } = card}
            <BoxCard
              {title}
              {description}
              link={link[0]}
              class={cn(
                'z-30 flex-1 basis-[448px]',
                postIt?.[0] &&
                  'xl:max-h-[365px] xl:first:col-span-2 xl:first:row-span-2 xl:first:max-h-[325px]'
              )}
              contentClass={cn(
                postIt?.[0]
                  ? i === 0 && 'border-b-none lg:border-r-none xl:border-r-1'
                  : i === 0 && 'border-b-none xl:border-b-1',
                i === 1 && 'border-b-none xl:border-b-1'
              )}
            />
          {/each}
        </div>

        <!-- Bottom or Right dashed line -->
        <span
          class={cn(
            'horizontal-dashed-border absolute bottom-0 h-1 w-full',
            postIt?.[0] && 'xl:vertical-dashed-border xl:right-0 xl:h-full xl:w-1'
          )}
        />

        <!-- Bottom Fade -->
        <span
          role="presentation"
          class={cn(
            'absolute bottom-0 right-0 z-10 h-full w-[20px] bg-gradient-to-l from-background to-transparent',
            postIt?.[0] && 'w-[10px] xl:h-[50px] xl:w-full xl:bg-gradient-to-t'
          )}
        />
      </div>
    {/if}
  </div>
</section>
