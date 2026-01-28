<script lang="ts" context="module">
  export const icons = [
    'arrow-right',
    'article',
    'calculator',
    'careers',
    'check',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'clock',
    'companies',
    'compare',
    'cross',
    'customers',
    'discount',
    'email',
    'engagement',
    'error',
    'frankli',
    'growth',
    'hand',
    'handshake',
    'hr-teams',
    'integrations',
    'knowledge-center',
    'loading',
    'manual',
    'menu',
    'news',
    'partners',
    'performance-management',
    'placeholder',
    'platform',
    'pricing',
    'remove',
    'search',
    'select',
    'sparks',
    'template'
  ] as const;

  export type IconOption = (typeof icons)[number];

  export const isValidIcon = (icon: unknown): icon is IconOption => {
    return icons.some((item) => item === icon);
  };

  export const getValidIcon = (icon: unknown): IconOption | undefined => {
    if (isValidIcon(icon)) return icon;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  export let icon: IconOption;
  export let size: number = 16;

  let className: string | undefined = undefined;
  export { className as class };

  const importIcon = (name: IconOption) => import(`./assets/${name}.svg?raw`);
</script>

<div
  style:--size="{size}px"
  class={cn(
    'h-[--size] w-[--size]',
    icon === 'loading' && 'animate-spin',
    icon === 'hand' && 'group-hover:animate-hand-wave',
    className
  )}
>
  <i data-icon={icon} aria-hidden="true" {...$$restProps}>
    {#await importIcon(icon)}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 {size} {size}" />
    {:then mod}
      {#if mod && mod.default}
        <!-- eslint-disable-next-line -->
        {@html mod.default}
      {/if}
    {/await}
  </i>
</div>
