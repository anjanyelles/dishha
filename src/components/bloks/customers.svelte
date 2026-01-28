<script lang="ts">
  import { page } from '$app/stores';
  import type { CustomersStoryblok } from '$types/bloks';

  import { isCmsStory } from '$lib/utils/cms';
  import { customerStories } from '$lib/content';

  import Title from '$components/title.svelte';
  import PostIt from '$components/post-it.svelte';
  import Background from '$components/customers/background.svelte';

  export let blok: CustomersStoryblok;
  $: ({ title, post_its } = blok);
</script>

<section data-theme="dark" class="relative isolate flex w-full overflow-hidden">
  <Background />

  <div
    class="relative flex h-full w-full max-w-container flex-col px-20 py-40 lg:px-48 lg:py-0 xl:mx-auto"
  >
    {#if title?.[0]}
      <Title data={title[0]} class="pb-48 pt-80" />
    {/if}

    {#if !!post_its?.length}
      <div
        class="flex w-full flex-col items-center justify-between gap-48 pb-120 pt-36 lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-120 xl:grid-cols-3"
      >
        {#each post_its as { type, quote, customer_story }}
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
            data-theme={author ? customerStory?.content.theme : $page?.data?.story?.content?.theme}
          >
            <PostIt {type} {quote} {author} {customerStory} size="medium" />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
