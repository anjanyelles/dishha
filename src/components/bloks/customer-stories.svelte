<script lang="ts">
  import type { CustomerStoriesStoryblok } from '$types/bloks';

  import { page } from '$app/stores';

  import { cn } from '$lib/utils/tailwind';
  import { isCmsStory } from '$lib/utils/cms';
  import { customerStories } from '$lib/content';

  import PostIt from '$components/post-it.svelte';
  import Illustrations from '$components/customer-stories/illustrations.svelte';

  const postItsStyles = [
    'xl:-translate-y-40 rotate-4',
    'rotate-0',
    'xl:-translate-y-50 rotate-6',
    'rotate-0',
    'xl:translate-y-10 rotate-6'
  ];

  export let blok: CustomerStoriesStoryblok;
  $: ({ items } = blok);
</script>

<section
  class="relative mx-auto mt-62 flex w-full flex-wrap items-center justify-center gap-128 gap-y-60 pb-80"
>
  <Illustrations />

  {#each items as { type, quote, customer_story }, i}
    {@const customerStory =
      typeof customer_story === 'string'
        ? $customerStories?.find((item) => item.uuid === customer_story)
        : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

    {@const author =
      customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
        ? customerStory?.content?.customer.content
        : undefined}

    <div
      class="z-10"
      data-theme={customerStory ? customerStory.content.theme : $page?.data?.story?.content?.theme}
    >
      <PostIt {type} {quote} {author} size="medium" {customerStory} class={cn(postItsStyles[i])} />
    </div>
  {/each}
</section>
