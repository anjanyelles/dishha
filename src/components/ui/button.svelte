<script lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { cn } from '$lib/utils/tailwind';

  import type { IconOption } from '$components/ui/icon/icon.svelte';
  import Icon, { getValidIcon, isValidIcon } from '$components/ui/icon/icon.svelte';

  const button = cva(
    `
      group
      relative

      h-fit
      w-fit

      inline-flex
      items-center
      justify-center

      whitespace-nowrap

      text-sm/snug
      tracking-wide
      text-foreground


      rounded-full
      focus-visible:ring-offset-3

      cursor-pointer

      motion-safe:transition-all

      disabled:opacity-32
    `,
    {
      variants: {
        fullWidth: {
          true: 'w-full'
        },
        loading: {
          true: 'disabled:opacity-100 cursor-progress'
        }
      }
    }
  );

  type $$Props = {
    icon?: IconOption;
    disabled?: boolean;
    as?: 'button' | 'a';
    fullWidth?: VariantProps<typeof button>['fullWidth'];
    loading?: VariantProps<typeof button>['loading'];
  } & (({ as?: 'button' } & HTMLButtonAttributes) | ({ as: 'a' } & HTMLAnchorAttributes));

  export let as: $$Props['as'] = 'button';
  export let fullWidth: $$Props['fullWidth'] = false;
  let className: $$Props['class'] = undefined;
  export let icon: $$Props['icon'] = undefined;
  export let loading: $$Props['loading'] = false;
  export let disabled: $$Props['disabled'] = undefined;

  export { className as class };
</script>

<svelte:element
  this={as}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  role={as === 'a' ? 'link' : 'button'}
  aria-busy={loading}
  disabled={as === 'button' ? disabled || loading : undefined}
  class={cn(button({ fullWidth, loading }), className)}
  {...$$restProps}
>
  <div
    class="absolute inset-x-0 -bottom-4 -right-[7px] h-[52px] w-full translate-x-2 rounded-full bg-foreground"
  />

  <span
    class={cn(
      'relative flex h-[52px] w-full items-center justify-center gap-12 rounded-full border border-foreground bg-background px-24 text-center transition-all hover:bg-highlight-secondary',
      (isValidIcon(icon) || loading) && 'pe-20',
      icon && !fullWidth && 'min-w-[130px] justify-start',
      !loading && 'transform transition duration-75 active:translate-x-2 active:translate-y-4'
    )}
  >
    {#if loading && !icon}
      <Icon icon="loading" size={18} class="absolute animate-spin" />
    {/if}

    <span class={cn(loading && 'invisible')}>
      <slot />
    </span>

    {#if icon}
      {@const typedIcon = loading && icon ? getValidIcon('loading') : getValidIcon(icon)}
      {#if typedIcon}
        <Icon icon={typedIcon} size={loading ? 16 : 20} />
      {/if}
    {/if}
  </span>
</svelte:element>
