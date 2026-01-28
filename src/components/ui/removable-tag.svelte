<script lang="ts">
  import { cn } from '$lib/utils/tailwind';
  import { truncate } from '$lib/utils/string';

  import Icon from '$components/ui/icon/icon.svelte';

  // eslint-disable-next-line no-undef
  type T = $$Generic;

  let className: undefined | string = undefined;
  export { className as class };

  export let label: string;
  export let value: undefined | T = undefined;
  export let checked: boolean | undefined = undefined;
</script>

<div class={cn('w-fit', className)}>
  <input
    type="checkbox"
    {value}
    on:change
    on:mouseenter
    on:mouseleave
    on:click
    on:focus
    on:blur
    {checked}
    {...$$restProps}
    class={cn(
      'h-full w-full',
      'visually-hidden',
      '[&:checked+label]:border-opacity-24 [&:checked+label]:text-opacity-100 [&:focus-visible+label]:border-opacity-24 [&:focus-visible+label]:shadow-focus-lilac'
    )}
  />
  <label
    for={$$restProps.id}
    class="sele flex w-fit cursor-pointer items-center gap-12 whitespace-nowrap rounded-full border border-foreground border-opacity-4 bg-background py-8 pl-16 pr-16 text-sm/snug font-medium tracking-wide text-foreground text-opacity-80 transition hover:border-opacity-24"
  >
    {truncate(label, 26)}
    {#if checked}
      <Icon size={20} icon="remove" />
    {/if}
  </label>
</div>
