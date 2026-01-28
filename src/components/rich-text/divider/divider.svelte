<script lang="ts">
  import type { ISbRichtext } from '@storyblok/svelte';

  import Scribble from './scribble.svelte';

  export let content: ISbRichtext;
</script>

{#if content.type === 'horizontal_rule'}
  <div class="flex w-full items-center justify-center py-38 text-center">
    <Scribble />
  </div>
{/if}
