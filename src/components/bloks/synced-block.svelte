<script lang="ts">
  import type { SyncedBlockStoryblok } from '$types/bloks';

  import DynamicBlok from './dynamic-blok.svelte';

  export let blok: SyncedBlockStoryblok;
</script>

{#if blok.synced_block && typeof blok.synced_block !== 'string'}
  {#if blok.synced_block.content.body}
    {#each blok.synced_block.content.body as b}
      <DynamicBlok blok={b} />
    {/each}
  {/if}
{/if}
