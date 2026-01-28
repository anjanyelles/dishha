<script lang="ts">
  import type { HubspotFormStoryblok, PostItStoryblok } from '$types/bloks';

  import { page } from '$app/stores';

  import { cn } from '$lib/utils/tailwind';
  import { isCmsStory } from '$lib/utils/cms';
  import { customerStories } from '$lib/content';

  import Tag from '$components/ui/tag.svelte';
  import PostIt from '$components/post-it.svelte';
  import { getValidIcon, type IconOption } from '$components/ui/icon/icon.svelte';

  export let tag:
    | {
        label: string | undefined;
        icon: IconOption | undefined;
      }
    | undefined = undefined;
  export let title: string;
  export let description: string | undefined = undefined;
  export let highlight: PostItStoryblok | HubspotFormStoryblok | undefined = undefined;

  $: topics = $page.data.topics as { name: string; value: string }[];

  const getTag = (key: string) => {
    return topics.find((topic) => key === topic?.value)?.name;
  };
</script>

<div
  class={cn(
    'relative flex flex-col items-center justify-center gap-64 px-20 text-foreground md:max-w-container xl:mx-auto xl:px-0',
    highlight?.component === 'post-it' ? 'py-80' : 'pb-48 pt-80'
  )}
>
  <div class="relative flex w-full max-w-richtext flex-col items-start gap-24">
    {#if tag}
      {@const { icon, label } = tag}
      {@const typedIcon = getValidIcon(icon)}
      {#if label}
        <Tag icon={typedIcon}>{getTag(label)}</Tag>
      {/if}
    {/if}

    {#if title}
      <h1 class="font-serif text-richtext-heading/none font-normal tracking-none">{title}</h1>
    {/if}

    {#if description}
      <p class="text-lg/snug font-normal tracking-wide">{description}</p>
    {/if}

    {#if highlight?.component === 'post-it'}
      {@const { type, size, quote, customer_story } = highlight}

      {@const customerStory =
        typeof customer_story === 'string'
          ? $customerStories?.find((item) => item.uuid === customer_story)
          : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

      {@const author =
        customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
          ? customerStory?.content?.customer.content
          : undefined}

      <div
        class="self-center pb-0 pt-48 desktop:absolute desktop:-right-[calc(50%+26px)] desktop:bottom-10 2xl:py-0"
      >
        <PostIt {type} {size} {quote} {author} {customerStory} />
      </div>
    {/if}
  </div>
</div>
