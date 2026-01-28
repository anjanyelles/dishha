<script lang="ts">
  import { RichTextResolver, type ISbRichtext } from '@storyblok/js';

  import { cn } from '$lib/utils/tailwind';

  export let content: ISbRichtext;

  const resolver = new RichTextResolver();
</script>

<svelte:element
  this={`h${content?.attrs?.level}`}
  class={cn(
    'text-foreground',
    content?.attrs?.level == 2
      ? 'py-24 font-serif text-2xl/tight'
      : 'pb-12 pt-24 text-md/normal font-semibold [&_b]:font-semibold'
  )}
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html resolver.render(content)}
</svelte:element>

<style lang="postcss">
  h1,
  h2,
  h3,
  h4 {
    & > img {
      border-radius: 20px;
    }
  }
</style>
