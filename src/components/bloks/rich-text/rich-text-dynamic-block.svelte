<script lang="ts" context="module">
  const files: Record<string, ComponentType> = import.meta.glob('./*.svelte', {
    import: 'default',
    eager: true
  });

  const bloks = Object.entries(files).reduce<typeof files>((acc, [path, blok]) => {
    const name = path.replace('./', '').replace('.svelte', '');

    acc[name] = blok;

    return acc;
  }, {});

  export type Bloks = keyof typeof bloks;

  const isComponent = (blok: ISbComponentType): blok is ISbComponentType<Bloks> => {
    return !!blok.component && blok.component in bloks;
  };
</script>

<script lang="ts">
  import { dev } from '$app/environment';
  import type { ComponentType } from 'svelte';
  import type { ISbComponentType } from '$types/cms';
  import { storyblokEditable } from '@storyblok/svelte';

  import { cn } from '$lib/utils/tailwind';

  export let blok: ISbComponentType;

  $: Component = isComponent(blok) ? bloks[blok.component] : null;

  $: if (!Component && dev) {
    console.error('Uncaught richtext component:', blok.component);
  }

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div use:storyblokEditable={blok} class={cn(className)}>
  <svelte:component this={Component} {blok} {...$$restProps} />
</div>
