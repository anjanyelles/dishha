<script lang="ts">
  import type { AssetStoryblok } from '$types/bloks';
  import { storyblokEditable } from '@storyblok/svelte';

  import { screens } from '$lib/utils/tailwind';
  import { objectEntries } from '$lib/utils/object';
  import { getImageAttributes, type ImageAttributesOptions } from '$lib/utils/cms';

  export let as: 'inline' | 'img' = 'img';
  export let asset: AssetStoryblok;
  export let options: Partial<ImageAttributesOptions> | undefined = undefined;
  export let withSizeAttributes = false;
  export let lazy = true;
  export let preload = false;
  export let showCaption = false;
  export let sizes:
    | Partial<Record<keyof typeof screens, Partial<ImageAttributesOptions>>>
    | undefined = undefined;
  let className: string | undefined = undefined;
  export { className as class };

  $: ({ src, alt, title, ...size } = getImageAttributes(asset, options));

  $: willFetchSvg = as === 'inline' && asset.filename.endsWith('.svg');
</script>

<svelte:head>
  {#if preload}
    {@const as = willFetchSvg ? 'fetch' : 'image'}
    <link rel="preload" {as} href={src} />
  {/if}
</svelte:head>

{#if willFetchSvg}
  {#await fetch(src) then data}
    {#if data.ok}
      {#await data.text() then svg}
        <div class={className}>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html svg}
        </div>
      {/await}
    {/if}
  {/await}
{:else}
  <figure use:storyblokEditable={asset}>
    {#if sizes}
      {#each objectEntries(sizes) as [screen, options] (screen)}
        {@const { src: srcset } = getImageAttributes(asset, options)}
        <source media="(max-width: {screens[screen]})" {srcset} />
      {/each}
    {/if}
    <img
      loading={lazy ? 'lazy' : 'eager'}
      class={className}
      {src}
      {alt}
      {title}
      width={withSizeAttributes ? size.width : undefined}
      height={withSizeAttributes ? size.height : undefined}
    />

    {#if !!title && showCaption && typeof title === 'string'}
      <figcaption class="mt-8 text-xs/snug text-foreground">{title}</figcaption>
    {/if}
  </figure>
{/if}
