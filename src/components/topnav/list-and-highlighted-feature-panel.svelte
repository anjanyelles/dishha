<script lang="ts">
  import type { PanelHighlightedStoryblok } from '$types/bloks';

  import FeatureItem from '$components/topnav/feature-item.svelte';
  import PanelHeader from '$components/topnav/panel-header.svelte';
  import TaggedLinkList from '$components/topnav/tagged-link-list.svelte';

  export let data: PanelHighlightedStoryblok;
</script>

{#if data}
  {@const { header, items, link_list } = data}
  <div
    class="flex h-full w-full flex-col items-start justify-start p-8 xl:flex-row xl:items-center xl:justify-normal xl:p-16"
  >
    {#if header && header[0]}
      <PanelHeader data={header[0]} class="h-fit w-full max-w-[292px] xl:mr-[15px] xl:h-full" />
    {/if}

    <span class="vertical-dashed-border hidden h-full w-1 flex-shrink-0 xl:block" />

    <div
      class="flex h-full w-full flex-col items-center justify-start pt-32 xl:flex-row xl:pl-16 xl:pt-0"
    >
      {#if link_list[0] && link_list[0].links.length > 0}
        <TaggedLinkList data={link_list[0]} class="xl:max-w-[488px]" />
      {/if}

      {#if items && items.length > 0}
        {#each items as feature}
          <FeatureItem
            isHighlighted
            data={feature}
            class="mb-32 ml-auto mt-24 h-fit w-full self-end xl:mb-0 xl:mt-0 xl:h-full xl:max-w-[252px]"
          />
        {/each}
      {/if}
    </div>
  </div>
{/if}
