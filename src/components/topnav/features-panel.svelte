<script lang="ts">
  import type { PanelThreePagesStoryblok } from '$types/bloks';

  import FeatureItem from '$components/topnav/feature-item.svelte';
  import PanelHeader from '$components/topnav/panel-header.svelte';

  export let data: PanelThreePagesStoryblok;
</script>

{#if data}
  {@const { header, items } = data}
  <div
    class="flex h-full w-full flex-col items-start justify-between bg-background p-16 xl:flex-row xl:items-center"
  >
    {#if header && header[0]}
      <PanelHeader data={header[0]} class="h-fit xl:h-full" />
    {/if}

    <span class="vertical-dashed-border hidden h-full w-1 xl:block" />

    {#if items && items.length > 0}
      <div
        class="flex h-full w-full flex-col justify-start pt-32 xl:w-fit xl:flex-row xl:justify-normal xl:pt-0"
      >
        {#each items as feature}
          <FeatureItem class="xl:max-w-[252px]" data={feature} />

          <span class="horizontal-dashed-border my-8 h-1 w-full last:hidden xl:hidden" />
        {/each}
      </div>
    {/if}
  </div>
{/if}
