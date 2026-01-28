<script lang="ts">
  import { storyblokEditable } from '@storyblok/svelte';
  import type { PricingPlanStoryblok } from '$types/bloks';

  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Tag from '$components/ui/tag.svelte';
  import Button from '$components/ui/button.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  export let isAnnual = false;
  export let data: PricingPlanStoryblok;
  $: ({ name, monthly_price, annual_price, description, cta } = data);

  $: price = isAnnual ? annual_price : monthly_price;
</script>

<th
  use:storyblokEditable={data}
  class="flex max-w-[261px] flex-col items-start justify-center gap-24 px-16 py-24 font-normal xl:px-32 xl:pb-48 xl:pt-80 xl:first:pl-48"
>
  <div class="flex flex-col text-start xl:items-center xl:gap-16">
    {#if name}
      <Tag class="hidden xl:block">
        {name}
      </Tag>
    {/if}

    {#if price}
      <span class="font-serif text-2xl/tight text-foreground xl:text-3xl/none">
        {#if typeof price === 'number'}
          {Number(price).toLocaleString()}
        {:else}
          {price}
        {/if}
      </span>
    {/if}

    {#if description}
      <p
        class="mt-8 whitespace-pre break-keep text-md/normal tracking-wide opacity-64 xl:mt-0 xl:text-center"
      >
        {description}
      </p>
    {/if}

    {#if cta?.length}
      {#each cta as cta}
        {@const { icon, title, link } = cta}
        {@const { href, target, rel } = getAnchorFromCmsLink(link)}
        {@const typedIcon = getValidIcon(icon)}
        <Button as="a" icon={typedIcon} {href} {target} {rel} class="mt-24 xl:mt-0">
          {title}
        </Button>
      {/each}
    {/if}
  </div>
</th>
