<script lang="ts">
  import type { TaggedLinkListStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { smallDesktop } from '$lib/utils/media';
  import { createMediaStore } from '$lib/stores/media';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Tag from '$components/ui/tag.svelte';
  import Link from '$components/ui/link.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  const isMobile = createMediaStore(smallDesktop);

  export let data: TaggedLinkListStoryblok;
  $: ({ tag, links } = data);
</script>

<div
  class={cn(
    `
      flex
      w-full

      flex-col
      items-start
    `,
    className
  )}
>
  <div class="flex w-full items-center justify-between pl-4 pr-16 pt-12 lg:pl-8 lg:pt-16">
    {#if tag && tag[0]}
      {@const { icon, label } = tag[0]}
      {@const typedIcon = getValidIcon(icon)}
      <Tag icon={typedIcon} class="bg-opacity-16 text-opacity-100">{label}</Tag>
    {/if}

    {#if $isMobile && links && links[links.length - 1]}
      {@const { title, link } = links[links.length - 1]}
      {@const { href, rel } = getAnchorFromCmsLink(link)}
      <Link size="medium" {href} target="_self" {rel}>
        {title}
      </Link>
    {/if}
  </div>

  {#if links && links.length > 0}
    <div
      class={cn(
        'mt-12 grid w-full grid-flow-col grid-cols-1 grid-rows-3 xl:mt-0 xl:grid-rows-4 xl:pt-10',
        links.length > 4 && 'grid-cols-2 grid-rows-7'
      )}
    >
      {#if $isMobile}
        <!-- Without the last item -->
        {#each links.slice(0, -1) as linkItem}
          {@const { icon, link, title: linkTitle } = linkItem}
          {@const { href, rel } = getAnchorFromCmsLink(link)}
          {@const typedIcon = getValidIcon(icon)}
          <Link
            size="medium"
            {href}
            target="_self"
            {rel}
            icon={typedIcon}
            class="self-start px-18 py-12"
          >
            <p>{linkTitle}</p>
          </Link>
        {/each}
      {:else}
        {#each links as linkItem}
          {@const { icon, link, title: linkTitle } = linkItem}
          {@const { href, rel } = getAnchorFromCmsLink(link)}
          {@const typedIcon = getValidIcon(icon)}
          <Link
            size="medium"
            {href}
            target="_self"
            {rel}
            icon={typedIcon}
            class="self-start py-12 pl-16 pr-18"
          >
            <p>{linkTitle}</p>
          </Link>
        {/each}
      {/if}
    </div>
  {/if}
</div>
