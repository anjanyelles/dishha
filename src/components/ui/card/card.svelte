<script lang="ts">
  import { cva } from 'class-variance-authority';

  import { cn } from '$lib/utils/tailwind';
  import type { ThemeOption } from '$lib/utils/themes';

  import Tag from '$components/ui/tag.svelte';
  import Link from '$components/ui/link.svelte';
  import { getValidIcon, type IconOption } from '$components/ui/icon/icon.svelte';

  export const card = cva(
    [
      `
        relative

        h-fit
        justify-between

        bg-background

        border
        border-foreground
        rounded-3xl

        flex
        flex-col
        gap-50

        group-focus-visible:outline-none 
        group-focus-visible:ring-3 
        group-focus-visible:ring-outline
        group-focus-visible:ring-offset-background

        group-active:ring-0
      `
    ],
    {
      variants: {
        variant: {},
        size: {
          sm: `
            p-20

            min-h-[372px]
            min-w-[272px]
            w-[272px]
          `,
          md: `
            p-24

            min-h-[461px]
            min-w-[344px]
            w-[344px]
          `,
          lg: `
            p-24

            min-h-[500px]
            min-w-[390px]
            w-[390px]
          `
        },
        hasBackCard: {
          true: `
            transition 
            duration-300 
            ease-in-out

            group-hover:-rotate-3
            group-hover:translate-y-20

            group-focus:-rotate-3
            group-focus:translate-y-20

            group-active:rotate-0
            group-active:translate-x-0
            group-active:translate-y-0
          `
        }
      },
      defaultVariants: {
        size: 'md'
      }
    }
  );

  export const backCard = cva(
    [
      `
        absolute 
        -top-28 
        left-28  

        flex-shrink-0

        transition 
        duration-300 
        ease-in-out

        group-hover:-translate-y-18 
        group-hover:rotate-6 

        group-focus:-translate-y-18 
        group-focus:rotate-6

        lg:group-active:translate-x-0 
        lg:group-active:translate-y-0 
        lg:group-active:rotate-0
      `
    ],
    {
      variants: {
        size: {
          sm: `
            min-h-[372px]
            min-w-[272px]
            w-[272px]
          `,
          md: `
            min-h-[461px]
            min-w-[344px]
            w-[344px]
          `,
          lg: `
            min-h-[500px]
            min-w-[390px]
            w-[390px]
          `
        }
      },
      defaultVariants: {
        size: 'md'
      }
    }
  );

  export let disabled = false;
  export let tag: string | undefined = undefined;
  export let title: string;
  export let size: 'sm' | 'md' | 'lg' = 'lg';
  export let href: string | undefined = undefined;
  export let cta:
    | {
        icon?: IconOption | undefined;
        label: string;
      }
    | undefined = undefined;
  export let hasBackCard = false;
  export let backCardColor: ThemeOption = 'lilac';
  export let backCardStyle: string | undefined = undefined;
  export let contentCardStyle: string | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };

  const importBackCard = (color: ThemeOption) => import(`./assets/${color}.webp`);
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  role={href ? 'link' : ''}
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
  class={cn(
    'group relative focus-visible:ring-0',
    disabled && 'pointer-events-none opacity-32',
    className
  )}
>
  {#if hasBackCard}
    {#await importBackCard(backCardColor) then mod}
      {#if mod && mod}
        <img src={mod.default} alt="" class={cn(backCard({ size }), backCardStyle)} />
      {/if}
    {/await}
  {/if}

  <div class={cn(card({ size, hasBackCard }), contentCardStyle)}>
    <div class="flex flex-col gap-12">
      {#if tag}
        <Tag><p class="max-w-[209px] overflow-hidden truncate">{tag}</p></Tag>
      {/if}

      {#if title}
        <p
          class={cn(
            'font-serif font-normal text-foreground',
            size === 'sm' ? 'text-xl/snug' : 'text-2xl/tight'
          )}
        >
          {title}
        </p>
      {/if}
    </div>

    {#if cta?.label}
      {@const { icon, label } = cta}
      {@const typedIcon = getValidIcon(icon)}
      <div
        class={cn(
          'border-t border-dashed border-foreground border-opacity-24',
          size === 'sm' ? 'pt-20' : 'pt-24'
        )}
      >
        <Link tabindex={-1} arrow icon={typedIcon} size="medium" {href}>
          {label}
        </Link>
      </div>
    {/if}
  </div>
</svelte:element>
