<script context="module" lang="ts">
  export type ResourceFilters = {
    type?: ResourceType;
    topic?: string;
  };

  function getResourceTypeLabel(type: ResourceType) {
    switch (type) {
      case null:
        return string('filters.type.all');

      case 'article':
        return string('filters.type.article');

      case 'ebook':
        return string('filters.type.ebook');

      case 'template':
        return string('filters.type.template');

      default:
        return string('filters.type.all');
    }
  }

  let resourceTypes = [null, 'article', 'template', 'ebook'] as const;
  export type ResourceType = (typeof resourceTypes)[number];

  export const isValidResourceType = (icon: unknown): icon is ResourceType => {
    return resourceTypes.some((item) => item === icon);
  };
</script>

<script lang="ts">
  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';

  import Input from '$components/ui/input.svelte';
  import RemovableTag from '$components/ui/removable-tag.svelte';
  import MinimalSelect from '$components/ui/minimal-select.svelte';
  import { page } from '$app/stores';

  export let search: string;
  export let topics;
  export let loading: boolean;

  let className: string | undefined = undefined;
  export { className as class };

  $: filterQueryParams = $page.url.searchParams;
</script>

<div class={cn('flex flex-col gap-12 bg-background pb-16', className)}>
  <!-- TODO: Fix empty state on the url when we select the default value -->
  <MinimalSelect name="type" value={filterQueryParams.get('type') || null} {loading}>
    {#each resourceTypes as optionType}
      <option value={optionType}>{getResourceTypeLabel(optionType)}</option>
    {/each}
  </MinimalSelect>

  <Input
    {loading}
    id="search"
    icon="search"
    bind:value={search}
    placeholder={string('searchPlaceholder')}
  />

  <!-- Mobile Topics -->
  <!-- TODO: Fix conflits between desktop and mobile checkbox  -->
  <!-- <div class="relative flex flex-col gap-14 pt-12 md:hidden">
    <Accordion id={'topics-menu'}>
      <div slot="header" let:expanded let:attributes let:onClick>
        <button
          {...attributes}
          class="flex w-full items-center justify-between gap-20"
          on:click={onClick}
        >
          <p class="text-start text-sm/snug font-medium tracking-wide">Or pick a topic</p>
          <Icon
            icon="chevron-down"
            class={cn('shrink-0 transition-transform duration-300', expanded && 'rotate-180')}
            size={20}
          />
        </button>
      </div>
      {#if topics.length}
        <div class="flex flex-wrap gap-8 overflow-hidden pt-16 md:pt-0">
          {#each topics as { value, name }}
            {@const selected = filterQueryParams.getAll('topic').includes(value)}
            <RemovableTag {value} id={value} name="topic" label={name} checked={selected} />
          {/each}
        </div>
      {/if}
    </Accordion>
    <span
      class={cn('horizontal-dashed-border absolute -bottom-24 right-0  h-1 w-full md:hidden')}
    />
  </div> -->

  <!-- Desktop Topics -->
  <div class="flex-col gap-14 pt-32 md:flex">
    <p class="text-start text-sm/snug font-medium tracking-wide">Or pick a topic</p>
    {#if topics.length}
      <div class="flex flex-wrap gap-8 pt-16 md:flex-col">
        {#each topics as { value, name }}
          {@const selected = filterQueryParams.getAll('topic').includes(value)}
          <RemovableTag {value} id={value} name="topic" label={name} checked={selected} />
        {/each}
      </div>
    {/if}
  </div>
</div>
