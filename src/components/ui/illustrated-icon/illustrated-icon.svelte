<script lang="ts" context="module">
  export const illustratedIcons = [
    'awards',
    'business',
    'calculator',
    'chart-bar',
    'collaborate',
    'cycle',
    'feedback-cycle',
    'feedback',
    'frankli',
    'goals',
    'heart',
    'home',
    'hr-consultant',
    'hr-teams',
    'hris',
    'improve',
    'lead',
    'linegraph',
    'manual',
    'multi-sourced-feedback',
    'nothing',
    'partners',
    'pie-chart',
    'rocket',
    'saas',
    'talent',
    'time',
    'transparent',
    'user'
  ] as const;

  export const scribbles = ['halfmoon', 'square', 'cone'] as const;
  export const scribbleColors = {
    lilac: 'stroke-lilac-400',
    aqua: 'stroke-aqua-400',
    orange: 'stroke-orange-400',
    yellow: 'stroke-yellow-300'
  } as const;

  export type ScribbleColor = keyof typeof scribbleColors;

  export type ScribbleOption = (typeof scribbles)[number];

  export type IllustratedIconOption = (typeof illustratedIcons)[number];

  export const isValidIllustratedIcon = (icon: unknown): icon is IllustratedIconOption => {
    return illustratedIcons.some((item) => item === icon);
  };

  export const getValidIllustratedIcon = (icon: unknown): IllustratedIconOption | undefined => {
    if (isValidIllustratedIcon(icon)) return icon;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  export let size: number = 48;
  export let scribble: ScribbleOption | undefined = undefined;
  export let scribbleColor: ScribbleColor | undefined = undefined;
  export let icon: IllustratedIconOption;

  let className: string | undefined = undefined;
  export { className as class };

  export let scribbleClass: string | undefined = undefined;
  export let iconClass: string | undefined = undefined;

  const importScribble = (name: ScribbleOption) => import(`./scribbles/${name}.svg?raw`);
  const importIcon = (name: IllustratedIconOption) => import(`./assets/${name}.svg?raw`);
</script>

<div style:--size="{size}px" class={cn('relative isolate h-[--size] w-[--size]', className)}>
  {#if scribble}
    <div
      style:--size="{size}px"
      class={cn(
        'absolute -left-[7px] -top-[2px] -z-10 h-[--size] w-[--size] stroke-highlight opacity-60',
        scribble === 'halfmoon' && '-left-[14px]',
        scribble === 'square' && '-left-[9px]',
        scribble === 'cone' && '-left-[11px] -top-1',
        scribbleColor && scribbleColors[scribbleColor],
        scribbleClass
      )}
    >
      <i data-scribble={scribble} aria-hidden="true" {...$$restProps}>
        {#await importScribble(scribble)}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 {size} {size}" />
        {:then mod}
          {#if mod && mod.default}
            <!-- eslint-disable-next-line -->
            {@html mod.default}
          {/if}
        {/await}
      </i>
    </div>
  {/if}

  <div style:--size="{size}px" class={cn('h-[--size] w-[--size] text-foreground', iconClass)}>
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
</div>
