<script lang="ts">
  import type { ISbRichtext } from '@storyblok/js';

  import { cn } from '$lib/utils/tailwind';

  import { resolver } from '$components/rich-text/rich-text-renderer.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let content: ISbRichtext;
</script>

{#if content.content}
  <p
    class={cn(
      'w-full py-12 text-md/normal font-normal tracking-wide text-foreground',
      '[&_a]:cursor-pointer [&_a]:font-medium [&_a]:text-highlight-foreground hover:[&_a]:underline [&_b]:font-medium',
      className
    )}
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html resolver.render(content)}
  </p>
{:else}
  <br />
{/if}

<style lang="postcss">
  p {
    & > img {
      border-radius: 20px;
      margin: 36px 0 36px 0;
    }
  }
</style>
