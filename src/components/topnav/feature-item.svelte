<script lang="ts">
  import type { FeatureItemStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import IllustratedIcon, {
    getValidIllustratedIcon,
    isValidIllustratedIcon
  } from '../ui/illustrated-icon/illustrated-icon.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let isHighlighted = false;
  export let data: FeatureItemStoryblok;
  $: ({ icon, title, description, link } = data);
  $: ({ href, target, rel } = getAnchorFromCmsLink(link));
</script>

<svelte:element
  this={link?.story ? 'a' : 'div'}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  {rel}
  {href}
  {target}
  {...$$restProps}
  role={link?.story && 'link'}
  class={cn(
    `
        flex
        items-center
        justify-start
        gap-16

        rounded-18
        p-16
      
        motion-safe:transition-all

        xl:flex-col
        xl:items-start

        xl:justify-between

        xl:gap-0
    `,
    isHighlighted && 'bg-highlight bg-opacity-12',
    link?.story &&
      `
        hover:bg-highlight
        hover:bg-opacity-24
        active:bg-opacity-32 
    `,
    className
  )}
>
  {#if isValidIllustratedIcon(icon)}
    {@const typedIllustratedIcon = getValidIllustratedIcon(icon)}
    {#if typedIllustratedIcon}
      <IllustratedIcon scribble="halfmoon" icon={typedIllustratedIcon} />
    {/if}
  {/if}

  <div class="flex flex-col items-start gap-8 text-sm/snug tracking-wide text-foreground">
    <p>{title}</p>
    <p class="opacity-70">{description}</p>
  </div>
</svelte:element>
