<script lang="ts">
  import { onMount } from 'svelte';

  import { cn } from '$lib/utils/tailwind';
  import scrollDirection from '$lib/stores/scroll-direction';

  let isSticky = false;
  let topOffset: number;
  let containerRef: HTMLDivElement;
  export let translateOnDesktop = false;

  let className: undefined | string = undefined;
  export { className as class };

  function updateStickyState() {
    if (containerRef) {
      const topStyle = window.getComputedStyle(containerRef).top;
      topOffset = containerRef.getBoundingClientRect().top;
      isSticky = topOffset <= parseInt(topStyle, 10);
    }
    requestAnimationFrame(updateStickyState);
  }

  onMount(() => {
    updateStickyState();
  });
</script>

<!-- Sticky Element -->
<div
  data-sticky={isSticky ? '' : null}
  bind:this={containerRef}
  class={cn('sticky left-0 top-0 z-20', className)}
>
  <!-- Element that is going to translate -->
  <div
    class={cn(
      'ease-motion translate-y-0 transition-transform duration-300',
      isSticky && $scrollDirection === 'up'
        ? 'translate-y-top-nav-mobile xl:translate-y-top-nav'
        : 'translate-y-0',
      !translateOnDesktop && 'translate-y-0 xl:bg-transparent',
      isSticky ? 'bg-background' : 'bg-transparent'
    )}
  >
    <slot />
  </div>
</div>
