<script lang="ts">
  import type { TableStoryblok } from '$types/bloks';

  import TableHeader, {
    isPricingPlan,
    typePricingPlan,
    typeTableHeaderItem
  } from '$components/table/table-header.svelte';
  import Sticky from '$components/sticky.svelte';
  import Tabs from '$components/ui/tabs/tabs.svelte';
  import TableData from '$components/table/table-data.svelte';
  import PricingPlan from '$components/table/pricing-plan.svelte';
  import TableHeaderItem from '$components/table/table-header-item.svelte';

  export let blok: TableStoryblok;
  $: ({ header, table } = blok);

  let activeTab = 0;
  $: isAnnual = true;
</script>

<section class="pb-48">
  <table class="relative mx-auto flex max-w-container flex-col">
    {#if header?.length}
      <TableHeader blok={header?.[0]} bind:isAnnual class="xl:hidden" />

      <Sticky
        class="hidden data-[sticky]:border-b data-[sticky]:border-foreground data-[sticky]:border-opacity-4 xl:block"
      >
        <TableHeader blok={header?.[0]} bind:isAnnual />
      </Sticky>

      <!-- Mobile Header -->
      {#if header?.[0].items?.length}
        {@const parsedTabs = header?.[0].items.map(({ name }, i) => ({
          id: i,
          label: name ? name : ''
        }))}

        <Sticky
          class="h-full data-[sticky]:border-b data-[sticky]:border-foreground data-[sticky]:border-opacity-4 xl:hidden"
        >
          <div class="w-full overflow-auto">
            <Tabs
              {activeTab}
              options={parsedTabs}
              on:optionSelect={(e) => {
                activeTab = e.detail.i;
              }}
              class="w-full bg-background"
            />
          </div>

          <div class="w-full xl:hidden">
            {#if header?.[0].items?.length && header?.[0].items[activeTab]}
              {#if isPricingPlan(header?.[0].items[activeTab])}
                <PricingPlan data={typePricingPlan(header?.[0].items[activeTab])} {isAnnual} />
              {:else}
                <TableHeaderItem data={typeTableHeaderItem(header?.[0].items[activeTab])} />
              {/if}
            {/if}
          </div>
        </Sticky>
      {/if}
    {/if}

    {#if table?.tbody?.length}
      <TableData {table} {activeTab} />
    {/if}
  </table>
</section>
