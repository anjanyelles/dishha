<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  import Icon from './icon/icon.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  // eslint-disable-next-line no-undef
  type T = $$Generic;
  export let value: T | undefined = undefined;
  export let disabled = false;
  export let loading = false;
</script>

<label
  for={$$props.id}
  class={cn('group relative flex cursor-pointer rounded-full text-foreground', className)}
>
  {#if loading && value}
    <Icon icon="loading" size={18} class="absolute left-18 top-18 animate-spin" />
  {:else}
    <Icon
      icon="select"
      size={18}
      class="absolute left-18 top-18 opacity-48 group-active:opacity-100"
    />
  {/if}

  <select
    bind:value
    on:change
    on:mouseenter
    on:mouseleave
    on:click
    on:focus
    on:blur
    {disabled}
    {...$$restProps}
    class={cn(
      'h-full w-full',
      'cursor-pointer appearance-none',
      'bg-background',
      'py-17 pl-48',
      'rounded-full border border-foreground border-opacity-12',
      'hover:border-opacity-24',
      'text-sm/snug font-medium tracking-wide'
    )}
  >
    <slot />
  </select>
</label>
