<script lang="ts" context="module">
  export const isPricingPlan = (
    item: PricingPlanStoryblok | TableHeaderItemStoryblok
  ): item is PricingPlanStoryblok => {
    return item.component === 'pricing-plan';
  };

  export const typePricingPlan = (item: PricingPlanStoryblok | TableHeaderItemStoryblok) =>
    item as PricingPlanStoryblok;

  export const typeTableHeaderItem = (item: PricingPlanStoryblok | TableHeaderItemStoryblok) =>
    item as TableHeaderItemStoryblok;
</script>

<script lang="ts">
  import type {
    PricingPlanStoryblok,
    TableHeaderItemStoryblok,
    TableHeaderStoryblok
  } from '$types/bloks';

  import Switch from '$components/ui/switch.svelte';

  import PricingPlan from './pricing-plan.svelte';
  import TableHeaderItem from './table-header-item.svelte';
  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';

  let className: string | undefined = undefined;
  export { className as class };

  export let isAnnual: boolean;
  export let blok: TableHeaderStoryblok;
  $: ({ title, description, items } = blok);

  $: isPricingTable = items.some((item) => item.component === 'pricing-plan');
</script>

<div class={cn('flex w-full flex-col bg-background xl:flex-row', className)}>
  <th
    class="relative flex flex-col px-16 pb-24 pt-48 text-start font-normal xl:px-48 xl:pb-48 xl:pt-80"
  >
    {#if title}
      <p class="w-full font-serif text-2xl/tight font-normal xl:min-w-[252px] xl:max-w-[252px]">
        {title}
      </p>
    {/if}
    {#if description}
      <p class="mt-24 font-normal opacity-64 xl:mt-36 xl:max-w-[237px]">{description}</p>
    {/if}

    {#if isPricingTable}
      <Switch bind:checked={isAnnual} class="mt-24 w-full max-w-[500px]">
        <div slot="unchecked">{string('pricing.month')}</div>
        <div slot="checked">{string('pricing.year')}</div>
      </Switch>
    {/if}

    <span class="vertical-dashed-border absolute right-0 top-0 hidden h-full w-1 xl:block" />

    <!-- Top Fade -->
    <span
      role="presentation"
      class="absolute right-0 top-0 z-10 hidden h-1/2 w-1 bg-gradient-to-b from-background to-transparent xl:block"
    />
  </th>

  <!-- Desktop -->
  {#if items?.length}
    <div class="hidden w-full xl:grid xl:grid-cols-4">
      {#each items as item}
        {#if item.component === 'pricing-plan'}
          <PricingPlan data={item} {isAnnual} />
        {:else}
          <TableHeaderItem data={item} />
        {/if}
      {/each}
    </div>
  {/if}
</div>
