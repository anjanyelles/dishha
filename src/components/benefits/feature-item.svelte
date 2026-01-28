<script lang="ts">
  import type { FeatureItemStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import IllustratedIcon, {
    getValidIllustratedIcon,
    isValidIllustratedIcon
  } from '$components/ui/illustrated-icon/illustrated-icon.svelte';

  import { getValidIcon } from '$components/ui/icon/icon.svelte';
  import Button from '$components/ui/button.svelte';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { storyblokEditable } from '@storyblok/svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let data: FeatureItemStoryblok;
  $: ({ icon, title, description, cta } = data);
</script>

<div
  use:storyblokEditable={data}
  class={cn(
    'flex-1 basis-[480px] flex-col items-start px-0 py-32 text-md tracking-wide text-foreground lg:px-48',
    className
  )}
>
  {#if isValidIllustratedIcon(icon)}
    {@const typedIllustratedIcon = getValidIllustratedIcon(icon)}
    {#if typedIllustratedIcon}
      <IllustratedIcon size={56} scribble="halfmoon" icon={typedIllustratedIcon} />
    {/if}
  {/if}

  <p class="mt-20 font-medium">{title}</p>
  <p class="mt-6 opacity-70">{description}</p>

  {#if cta && cta[0]}
    {@const { title, icon, link } = cta[0]}
    {@const { href, target, rel } = getAnchorFromCmsLink(link)}
    <Button as="a" class="pt-20" {href} {target} {rel} icon={getValidIcon(icon)}>
      {title}
    </Button>
  {/if}
</div>
