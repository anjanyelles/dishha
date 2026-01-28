<script lang="ts">
  import { cva } from 'class-variance-authority';

  import { cn } from '$lib/utils/tailwind';

  import Tag from '$components/ui/tag.svelte';
  import Link from '$components/ui/link.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';
  import type { AssetStoryblok, TagStoryblok } from '$types/bloks';
  import { getAccentTheme } from '$lib/utils/themes';
  import { page } from '$app/stores';
  import { getImageAttributes } from '$lib/utils/cms';
  import IllustratedIcon, {
    getValidIllustratedIcon,
    isValidIllustratedIcon
  } from '../illustrated-icon/illustrated-icon.svelte';

  export const card = cva(
    [
      `
        group
        relative

        justify-between

        p-24
  
        bg-background

        border
        border-foreground
        rounded-3xl

        flex
        flex-col
        gap-50
        `
    ],
    {
      variants: {
        isHighlighted: {
          true: `
                    bg-highlight-secondary
                    border-foreground
                    border-opacity-8
                `
        }
      },
      defaultVariants: {
        isHighlighted: true
      }
    }
  );

  export let illustratedIcon: string | undefined = undefined;
  export let logo: AssetStoryblok | undefined = undefined;
  export let title: string;
  export let description: string;
  export let tags: TagStoryblok[] | undefined = undefined;
  export let href: string | undefined = undefined;
  export let cta:
    | {
        icon?: string | undefined;
        label: string;
      }
    | undefined = undefined;
  export let isHighlighted = false;

  let className: string | undefined = undefined;
  export { className as class };

  $: story = $page.data.story;
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  data-theme={!isHighlighted ? getAccentTheme(story?.content?.theme) : story?.content?.theme}
  role={href ? 'link' : ''}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  {href}
  {...$$restProps}
  class={cn(card({ isHighlighted }), className)}
>
  <div class="space-y-28">
    {#if isValidIllustratedIcon(illustratedIcon)}
      {@const typedIllustratedIcon = getValidIllustratedIcon(illustratedIcon)}
      {#if typedIllustratedIcon}
        <IllustratedIcon
          icon={typedIllustratedIcon}
          scribble="cone"
          size={80}
          iconClass="ml-[10px] pt-[10px] size-60"
          scribbleColor="lilac"
          scribbleClass="opacity-100 size-62"
        />
      {/if}
    {:else if logo && logo.filename}
      {@const { src, alt } = getImageAttributes(logo)}
      <div class="aspect-auto">
        <img {src} {alt} class="h-[80px] max-w-[50%] flex-shrink-0 object-contain" />
      </div>
    {/if}

    <div class="flex flex-col gap-16 font-normal text-foreground">
      {#if title}
        <p class="font-serif text-2xl/tight">
          {title}
        </p>
      {/if}

      {#if description}
        <p class="text-md/normal tracking-wide opacity-72">
          {description}
        </p>
      {/if}
    </div>
  </div>

  <div class="space-y-24">
    {#if tags?.length}
      <div class="space-y-8">
        {#each tags as { label }}
          <Tag>{label}</Tag>
        {/each}
      </div>
    {/if}

    {#if cta?.label}
      {@const { icon, label } = cta}
      {@const typedIcon = getValidIcon(icon)}
      <div class="flex flex-col space-y-24">
        <span class="horizontal-dashed-border h-1 w-full" />

        <Link tabindex={-1} arrow icon={typedIcon} size="large" {href}>
          {label}
        </Link>
      </div>
    {/if}
  </div>
</svelte:element>
