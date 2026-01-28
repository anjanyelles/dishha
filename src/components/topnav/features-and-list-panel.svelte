<script lang="ts">
  import type { PanelTwoPagesStoryblok } from '$types/bloks';

  import { smallDesktop } from '$lib/utils/media';
  import { createMediaStore } from '$lib/stores/media';

  import FeatureItem from '$components/topnav/feature-item.svelte';
  import PanelHeader from '$components/topnav/panel-header.svelte';
  import TaggedLinkList from '$components/topnav/tagged-link-list.svelte';

  const isMobile = createMediaStore(smallDesktop);

  export let data: PanelTwoPagesStoryblok;
</script>

{#if data}
  {@const { header, items, link_list } = data}
  <div
    class="flex h-full w-full flex-col items-start justify-start p-16 xl:flex-row xl:items-center xl:gap-16"
  >
    {#if header && header[0]}
      <PanelHeader data={header[0]} class="h-fit xl:h-full" />
    {/if}

    <span class="vertical-dashed-border hidden h-full w-1 xl:block" />

    {#if items && items.length > 0}
      <div
        class="flex w-full flex-col justify-start pt-32 xl:h-full xl:w-fit xl:flex-row xl:justify-center xl:pt-0"
      >
        {#each items as feature}
          {@const { icon: _, ...featureWithoutIcon } = feature}
          <FeatureItem class="xl:max-w-[252px]" data={$isMobile ? featureWithoutIcon : feature} />

          <span class="horizontal-dashed-border my-8 h-1 w-full xl:hidden" />
        {/each}
      </div>
    {/if}

    <span class="vertical-dashed-border hidden h-full w-1 xl:block" />

    {#if link_list[0] && link_list[0].links.length > 0}
      <TaggedLinkList data={link_list[0]} class="h-fit xl:max-w-[220px]" />
    {/if}
  </div>
{/if}
