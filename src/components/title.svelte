<script lang="ts">
  import { cva } from 'class-variance-authority';
  import type { TitleStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Tag from '$components/ui/tag.svelte';
  import Button from '$components/ui/button.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  const titleStyle = cva(
    ['w-full', 'flex', 'max-w-[532px]', 'flex-col', 'gap-16 lg:gap-24', 'text-foreground'],
    {
      variants: {
        alignment: {
          left: ['items-start', 'text-left'],
          center: ['items-center', 'text-center']
        }
      }
    }
  );

  function handleAnchorClick(event: MouseEvent) {
    event.preventDefault();
    const link = event.currentTarget as HTMLAnchorElement;

    const anchorId = new URL(link.href).hash.replace('#', '');

    const anchor = document.getElementById(anchorId);
    if (anchor) {
      window.scrollTo({
        top: anchor.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  let className: undefined | string = undefined;
  export { className as class };

  export let titleClass: undefined | string = undefined;
  export let descriptionClass: undefined | string = undefined;

  export let data: TitleStoryblok;
  $: ({ alignment, tag, title, description, cta } = data);
</script>

<div class={cn(titleStyle({ alignment }), className)}>
  {#if tag && tag[0]}
    {@const { icon, label } = tag[0]}
    {@const typedIcon = getValidIcon(icon)}
    <Tag icon={typedIcon}>{label}</Tag>
  {/if}
  {#if title}
    <h2
      class={cn(
        'font-serif text-2xl/tight lg:text-3xl/tight',
        alignment === 'center' && 'lg:max-w-[744px]',
        titleClass
      )}
    >
      {title}
    </h2>
  {/if}
  {#if description}
    <p
      class={cn(
        'text-md/snug font-normal tracking-wide opacity-80 lg:text-lg/snug',
        descriptionClass
      )}
    >
      {description}
    </p>
  {/if}
  {#if cta && cta.length}
    <div class="mt-5 flex gap-2 md:mt-6">
      {#each cta as cta}
        {@const { icon, title, link } = cta}
        {@const { href, target, rel } = getAnchorFromCmsLink(link)}
        {@const typedIcon = getValidIcon(icon)}
        {#if link.anchor}
          <Button
            as="a"
            icon={typedIcon}
            on:click={handleAnchorClick}
            href={link.anchor}
            {target}
            {rel}
          >
            {title}
          </Button>
        {:else}
          <Button as="a" icon={typedIcon} {href} {target} {rel}>
            {title}
          </Button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
