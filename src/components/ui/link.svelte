<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { cva, type VariantProps } from 'class-variance-authority';
  import { cn } from '$lib/utils/tailwind';
  import type { IconOption } from './icon/icon.svelte';
  import Icon, { getValidIcon } from './icon/icon.svelte';

  const link = cva(
    `
        group
        relative

        w-fit
        h-full

        inline-flex
        items-center

        text-foreground
        hover:text-highlight-foreground
        active:text-highlight-foreground

        tracking-wide
        whitespace-nowrap

        rounded-6

        motion-safe:transition-all
    `,
    {
      variants: {
        arrow: {
          true: `
            w-full 
            hover:text-foreground
          `
        },
        size: {
          small: 'text-xs/snug',
          medium: 'text-sm/snug',
          large: 'text-md/normal'
        },
        loading: {
          false: 'cursor-pointer',
          true: 'cursor-progress'
        },
        disabled: {
          true: `
            pointer-events-none 
            opacity-32
          `
        }
      },
      defaultVariants: {
        size: 'small'
      }
    }
  );

  type $$Props = {
    icon?: IconOption;
    as?: 'button' | 'a';
    size?: 'small' | 'medium' | 'large';
    arrow?: VariantProps<typeof link>['arrow'];
    loading?: VariantProps<typeof link>['loading'];
    disabled?: VariantProps<typeof link>['disabled'];
  } & (({ as?: 'button' } & HTMLButtonAttributes) | ({ as: 'a' } & HTMLAnchorAttributes));

  export let as: $$Props['as'] = 'a';
  export let arrow: $$Props['arrow'] = false;
  export let size: $$Props['size'] = 'small';
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = false;
  export let disabled: $$Props['disabled'] = undefined;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<svelte:element
  this={as}
  role={as === 'a' ? 'link' : 'button'}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  aria-busy={loading}
  disabled={as === 'button' ? disabled : undefined}
  class={cn(link({ arrow, loading, size, disabled }), className)}
  {...$$restProps}
>
  <span
    class={cn(
      'flex h-full w-full items-center justify-center gap-8',
      arrow ? 'w-full justify-between' : 'w-fit justify-start'
    )}
  >
    <div class="flex items-center justify-center gap-8">
      {#if icon || loading}
        {@const typedIcon = getValidIcon(icon)}
        {#if typedIcon}
          <Icon icon={typedIcon} size={size === 'small' ? 16 : 22} class="opacity-64" />
        {/if}
      {/if}

      <slot />
    </div>

    {#if arrow || loading}
      <Icon
        icon={loading ? 'loading' : 'arrow-right'}
        size={size === 'small' ? 20 : 24}
        class={cn(
          loading && 'animate-spin',
          '-translate-x-6 transition-transform group-hover:translate-x-0 group-focus-visible:translate-x-0'
        )}
      />
    {/if}
  </span>
</svelte:element>
