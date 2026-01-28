<script lang="ts">
  import type { PanelHeaderStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Tag from '$components/ui/tag.svelte';
  import Button from '$components/ui/button.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let data: PanelHeaderStoryblok;
  $: ({ tag, title, cta } = data);
</script>

<div class={cn('flex h-full flex-col items-start justify-between gap-16 p-16', className)}>
  <div class="flex flex-col items-start gap-16">
    {#if tag && tag[0]}
      {@const { icon, label } = tag[0]}
      {@const typedIcon = getValidIcon(icon)}
      <Tag icon={typedIcon} class="xl:hidden">{label}</Tag>
    {/if}

    {#if title}
      <h2 class="max-w-[260px] font-serif text-2xl/tight font-normal text-foreground">
        {title}
      </h2>
    {/if}
  </div>

  {#if cta && cta[0]}
    {@const { title, icon, link } = cta[0]}
    {@const { href, target, rel } = getAnchorFromCmsLink(link)}
    <Button as="a" {href} {target} {rel} icon={getValidIcon(icon)}>
      {title}
    </Button>
  {/if}
</div>
