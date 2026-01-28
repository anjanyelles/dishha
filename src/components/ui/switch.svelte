<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  let halfWidth: number | string = 132;

  let className: undefined | string = undefined;
  export { className as class };
  export let itemClass: undefined | string = undefined;

  const switchItemClass = cn(
    'relative w-full',
    'cursor-pointer',
    'break-keep',
    'px-14 py-16 lg:px-24 lg:py-17',
    'text-sm text-center font-medium text-foreground',
    'motion-safe:transition-opacity',
    'hover:opacity-100',
    itemClass
  );

  export let name: string | undefined = undefined;
  export let checked = false;
</script>

<label
  class={cn('flex w-fit overflow-hidden rounded-full bg-foreground bg-opacity-4 p-2', className)}
>
  <div class="relative inline-flex w-full">
    <input type="checkbox" {name} bind:checked class="peer sr-only" />
    <span
      style:--width="{halfWidth}px"
      class="absolute left-0 top-0 h-full w-full max-w-[--width] rounded-full bg-over shadow-sm peer-checked:max-w-[calc(100%-var(--width))] peer-checked:translate-x-[--width] motion-safe:transition-all"
    />
    <div
      bind:clientWidth={halfWidth}
      class={cn(switchItemClass, 'opacity-100 peer-checked:opacity-64')}
    >
      <slot name="unchecked" />
    </div>
    <div class={cn(switchItemClass, 'opacity-64 peer-checked:opacity-100')}>
      <slot name="checked" />
    </div>
  </div>
</label>
