<script lang="ts">
  import type { HighlightCardStoryblok } from '$types/bloks';

  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Link from '$components/ui/link.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';
  import Background from '$components/highlight-card/background.svelte';

  export let blok: HighlightCardStoryblok;
  $: ({ title, description, cta } = blok);
</script>

<section class="flex w-full overflow-hidden pb-72">
  <div class="relative flex w-full items-center justify-center px-20 py-40 lg:container lg:mx-auto">
    <Background />

    <div class="w-full max-w-richtext rounded-3xl border border-foreground p-24 text-foreground">
      <div class="flex flex-col gap-12">
        <p class="font-serif text-xl/snug">{title}</p>
        <p class="text-md/normal font-normal tracking-wide">{description}</p>
      </div>

      {#if cta && cta.length}
        {@const { icon, link, title } = cta[0]}
        {@const typedIcon = getValidIcon(icon)}
        {@const { href, target, rel } = getAnchorFromCmsLink(link)}
        <div class="mt-10 border-t border-dashed border-foreground border-opacity-24 pt-24">
          <Link arrow icon={typedIcon} size="medium" {href} {target} {rel} class="font-medium">
            {title}
          </Link>
        </div>
      {/if}
    </div>
  </div>
</section>
