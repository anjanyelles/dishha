<script lang="ts">
  import { cva } from 'class-variance-authority';
  import type { ISbStoryData } from '@storyblok/svelte';
  import type { CustomerStoryStoryblok, CustomerStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { sanitizeSlug } from '$lib/utils/paths';

  import Image from '$components/image.svelte';

  const postIt = cva(
    `
      group
      relative 
      isolate 

      flex
    `,
    {
      variants: {
        type: {
          a: 'rotate-0',
          b: 'rotate-4',
          c: '-rotate-2',
          d: '-rotate-6'
        },
        size: {
          small: 'w-[280px]',
          medium: 'w-[350px]'
        }
      }
    }
  );

  const postItContent = cva(
    `
      flex
      flex-col 
      gap-24 

      bg-highlight-secondary
      text-highlight-foreground 

      transition-all 
    `,
    {
      variants: {
        size: {
          small: `
            p-24
          `,
          medium: `
            p-30
          `
        }
      }
    }
  );

  export let type: 'a' | 'b' | 'c' | 'd';
  export let size: 'small' | 'medium';
  export let quote: string;
  export let author: CustomerStoryblok | undefined = undefined;
  export let customerStory: ISbStoryData<CustomerStoryStoryblok> | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };

  let as: 'div' | 'a' = customerStory?.full_slug ? 'a' : 'div';

  const shadowStyle = cn(
    'absolute bottom-0  -z-10 h-10 w-full  bg-foreground opacity-10',
    size === 'small' ? 'max-w-[80%]' : 'max-w-[330px]',
    as === 'a' &&
      'transform transition duration-100 group-hover:opacity-16 group-focus-visible:opacity-16 group-active:opacity-10'
  );

  const bottomPadding = cn(author && (size === 'small' ? 'pb-30' : 'pb-60'));
</script>

<svelte:element
  this={as}
  role={as === 'a' ? 'link' : ''}
  on:click
  on:mouseenter
  on:mouseleave
  on:keydown
  on:keyup
  on:keypress
  on:focus
  on:blur
  {...$$restProps}
  href={customerStory?.full_slug ? sanitizeSlug(customerStory?.full_slug) : undefined}
  class={cn(postIt({ type, size }), className)}
  data-theme={customerStory?.content.theme}
>
  <div class={cn(postItContent({ size }), bottomPadding)}>
    {#if quote}
      <p class="text-md/normal font-normal tracking-wide">{quote}</p>
    {/if}

    {#if author}
      {@const { name, role, avatar } = author}
      <div class="flex items-center gap-12">
        {#if avatar}
          <Image
            asset={avatar}
            class={cn(
              'h-fit w-fit flex-shrink-0 rounded-full shadow-border',
              size === 'small' ? 'h-40 min-h-40 w-40 min-w-40' : 'size-56 min-h-56 min-w-56'
            )}
          />
        {/if}

        {#if name && author}
          <div class="flex flex-col gap-4">
            {#if name}
              <p class="font-handwrite text-xl/none font-normal">{name}</p>
            {/if}
            {#if role}
              <p class="text-xs/snug font-medium tracking-wide opacity-64">{role}</p>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Shadows -->
  <span class={cn('left-0 blur-10', shadowStyle)} />
  <span class={cn('left-10 -rotate-3 blur-5', shadowStyle)} />
</svelte:element>
