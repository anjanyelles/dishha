<script lang="ts">
  import type { PostItStoryblok } from '$types/bloks';

  import { isCmsStory } from '$lib/utils/cms';
  import { customerStories } from '$lib/content';

  import PostIt from '$components/post-it.svelte';

  export let blok: PostItStoryblok;
</script>

{#if blok}
  {@const { type, size, quote, customer_story } = blok}

  {@const customerStory =
    typeof customer_story === 'string'
      ? $customerStories?.find((item) => item.uuid === customer_story)
      : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

  {@const author =
    customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
      ? customerStory?.content?.customer.content
      : undefined}

  <div class="flex w-full items-center justify-center py-48 desktop:relative desktop:py-0">
    <PostIt
      {type}
      {size}
      {quote}
      {author}
      {customerStory}
      class="desktop:absolute desktop:-right-[calc(50%+35px)] desktop:-top-44 desktop:mt-0"
    />
  </div>
{/if}
