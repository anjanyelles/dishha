<script lang="ts">
  import { cva } from 'class-variance-authority';

  import type { StoryLinkStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { isCmsStory, typeLinkStory } from '$lib/utils/cms';

  import Link from '$components/ui/link.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  const boxCard = cva(
    `
        group 
        relative 
        isolate
      
        w-full
        h-[480px]

        motion-safe:transition-all
    `,
    {
      variants: {
        disabled: {
          true: 'pointer-events-none opacity-32'
        }
      }
    }
  );

  const boxCardContent = cn(
    `
    absolute
    top-0
    left-0

    flex
    flex-col 
    items-start 
    justify-between
    gap-48
    z-20
    
    w-full
    h-full

    p-32 pb-24

    bg-background
    group-hover:bg-highlight-secondary

    border
    border-box-card-border

    transition
    duration-150
    ease-in-out

    group-hover:-translate-x-6
    group-hover:-translate-y-6
    group-active:translate-x-0
    group-active:translate-y-0
    `
  );

  export let title: string;
  export let disabled = false;
  export let description: string;
  export let link: StoryLinkStoryblok | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };

  export let contentClass: string | undefined = undefined;
</script>

{#if link}
  {@const { icon, title: linkTitle, link: storyLink } = link}
  {@const isStory = storyLink ? isCmsStory(storyLink) : undefined}

  {#if isStory}
    {@const typedIcon = getValidIcon(icon)}
    {@const typedStory = typeLinkStory(storyLink)}
    {@const href = sanitizeSlug(typedStory?.full_slug)}
    <a
      on:click
      on:mouseenter
      on:mouseleave
      on:keydown
      on:keyup
      on:keypress
      on:focus
      on:blur
      {href}
      {...$$restProps}
      class={cn(boxCard({ disabled }), className)}
    >
      <div class={cn(boxCardContent, contentClass)}>
        <div class="flex h-full w-full flex-col gap-20 font-normal text-foreground">
          <p class="font-serif text-2xl/tight">{title}</p>
          <p class="max-w-[356px] text-md/normal tracking-wide opacity-70">{description}</p>
        </div>

        <div class="w-full border-t border-dashed border-foreground border-opacity-12 pt-24">
          <Link arrow icon={typedIcon} as="button" size="medium">
            {linkTitle}
          </Link>
        </div>
      </div>

      <!-- Background element that gives the 3D -->
      <div
        data-theme={typedStory?.content?.theme || 'lilac'}
        class={cn(
          'h-full',
          'w-full',
          'bg-highlight',

          'before:z-10',
          'before:absolute',
          'before:h-0',
          'befere:w-0',
          'before:top-0',
          'before:-right-[5px]',
          'lg:before:-right-[5px]',
          'xl:before:-right-[6px]',
          'before:border-[6px]',
          'lg:before:border-[6px]',
          'before:border-r-none',
          'before:border-transparent',
          'before:border-b-transparent',
          'before:border-l-highlight',
          'before:border-t-transparent',

          'after:z-10',
          'after:absolute',
          'after:h-0',
          'after:w-0',
          'after:bottom-0',
          'after:left-0',
          'after:border-[6.5px]',
          'after:border-l-none',
          'after:border-transparent',
          'after:border-b-transparent',
          'after:border-r-highlight',
          'after:border-t-transparent',

          'before:transform',
          'before:duration-150',
          'group-hover:before:-translate-y-[6px]',

          'after:transform',
          'after:duration-150',
          'group-hover:after:-translate-x-[12px]',

          'group-active:before:translate-y-0',
          'group-active:after:translate-x-0'
        )}
      />
    </a>
  {/if}
{/if}
