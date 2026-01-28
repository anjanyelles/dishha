<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils/tailwind';

  import Icon, { type IconOption } from '$components/ui/icon/icon.svelte';

  interface $$Props extends HTMLInputAttributes {
    icon?: IconOption;
    loading?: boolean;
  }

  export let value: $$Props['value'] = undefined;
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = undefined;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<label
  for={$$props.id}
  class={cn(
    'group relative flex items-center rounded-full bg-background text-foreground',
    className
  )}
>
  {#if icon}
    <Icon
      {icon}
      size={20}
      class={cn('absolute left-18', value && value.length > 0 ? 'opacity-100' : 'opacity-48')}
    />
  {/if}

  <input
    class={cn(
      'h-full w-full',
      'bg-transparent',
      'text-sm/snug font-medium tracking-wide placeholder:text-foreground placeholder:text-opacity-64',
      'py-17 pr-44',
      'rounded-full',
      'border border-foreground border-opacity-12',
      'hover:border-opacity-24 focus:ring-0 focus-visible:ring-3 peer-focus:outline-none',
      icon && 'pl-50'
    )}
    bind:value
    on:change
    on:mouseenter
    on:mouseleave
    on:click
    on:focus
    {...$$restProps}
  />

  {#if value && value.length > 0 && loading}
    <button on:click={() => (value = '')} class="absolute right-18">
      <Icon size={20} icon="loading" class="animate-spin" />
    </button>
  {/if}

  {#if value && value.length > 0 && !loading}
    <button on:click={() => (value = '')} class="absolute right-18">
      <Icon size={20} icon="remove" />
    </button>
  {/if}
</label>
