<script lang="ts">
  import { writable } from 'svelte/store';
  import { createSlider, melt } from '@melt-ui/svelte';

  import { cn } from '$lib/utils/tailwind';
  import { formatToCurrency } from '$lib/utils/string';

  export let value: number;
  export let min: number | undefined = 0;
  export let max: number | undefined = 100;
  export let step: number | undefined = 1;

  export let disabled = false;
  export let hasCurrency = false;

  const store = writable([value]);
  store.subscribe((val) => {
    value = val[0];
  });

  $: store.set([value]);

  const {
    elements: { root, range, thumbs }
  } = createSlider({
    min,
    max,
    step,
    disabled,
    value: store
  });

  let className: string | undefined = undefined;
  export { className as class };
</script>

<span use:melt={$root} class={cn('relative flex h-[36px] w-full items-center', className)}>
  <span class="h-8 w-full rounded-full bg-foreground bg-opacity-6">
    <span use:melt={$range} class="h-8 rounded-s-full bg-highlight" />
  </span>

  <span
    use:melt={$thumbs[0]}
    class={cn(
      'group',
      'px-16 py-8',
      'bg-over',
      'rounded-full border border-foreground border-opacity-8',
      !disabled && 'active:border-foreground active:border-opacity-8',
      !disabled && 'hover:cursor-grab active:cursor-grabbing',
      !disabled &&
        'hover:border-foreground-8 hover:border-foreground focus-visible:border-opacity-24 focus-visible:ring-highlight active:ring-0 active:ring-offset-box-card-border',
      disabled && 'cursor-not-allowed'
    )}
  >
    {#if disabled}
      <span
        class="absolute -left-1 -top-1 h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-full bg-highlight bg-opacity-32"
      />
    {/if}

    <p
      class={cn(
        'flex w-full flex-nowrap break-keep text-sm/snug font-medium tracking-wide text-[hsl(var(--color-foreground)/0.8)]',
        !disabled && 'group-active:text-[hsl(var(--color-foreground)/1)]'
      )}
    >
      {hasCurrency ? formatToCurrency(value) : value}
    </p>
  </span>
</span>
