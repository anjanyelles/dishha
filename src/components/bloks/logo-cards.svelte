<script lang="ts">
  import type { LogoCardsStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import LogoCard from '$components/ui/card/logo-card.svelte';

  export let blok: LogoCardsStoryblok;
  $: ({ cards } = blok);

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  class={cn(
    'relative isolate flex w-full flex-col justify-between overflow-hidden bg-transparent px-20 py-48 lg:mx-auto lg:flex-row xl:max-w-container xl:px-48',
    className
  )}
>
  {#if cards.length}
    <div class="grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3 xl:gap-48">
      {#each cards || [] as { is_highlighted: isHighlighted, illustrated_icon, logo, title, description, tags, link }}
        {@const { href, rel, target } = getAnchorFromCmsLink(link[0].link)}
        <LogoCard
          {isHighlighted}
          illustratedIcon={illustrated_icon?.toString() || undefined}
          {logo}
          {title}
          {description}
          {tags}
          {href}
          {rel}
          {target}
          cta={{
            icon: link[0].icon && typeof link[0].icon === 'string' ? link[0].icon : undefined,
            label: link[0].title
          }}
          class="min-h-[557px] max-w-[416px] flex-1"
        />
      {/each}
    </div>
  {/if}
</div>
