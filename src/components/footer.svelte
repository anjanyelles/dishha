<script lang="ts">
  import { page } from '$app/stores';
  import type { FooterConfigurationStoryblok } from '$types/bloks';

  import { string } from '$lib/strings';
  import { getAccentTheme } from '$lib/utils/themes';
  import { createMediaStore } from '$lib/stores/media';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Link from '$components/ui/link.svelte';
  import Logo from '$components/ui/logo.svelte';

  const isMobile = createMediaStore('(max-width: 1023px)');

  export let data: FooterConfigurationStoryblok;
  $: story = $page.data.story;
  $: ({ title, description, columns, links } = data);

  $: theme = getAccentTheme(story?.content?.theme);
</script>

<footer data-theme={theme} class="flex w-full bg-background text-foreground">
  <div
    class="mx-auto flex w-full max-w-container flex-col justify-between gap-32 px-20 xl:flex-row xl:gap-0 xl:px-48"
  >
    <div
      class="flex flex-col-reverse items-start justify-between gap-32 pt-20 xl:mr-48 xl:flex-col xl:gap-0 xl:py-48"
    >
      <div class="flex flex-col gap-8 xl:gap-24">
        <p class="font-serif text-2xl">{title}</p>
        <p class="max-w-[232px] text-xs text-foreground text-opacity-64">{description}</p>
      </div>

      <a href="/">
        <Logo class={$isMobile ? 'size-40' : 'size-100'} />
      </a>
    </div>

    <div class="flex max-w-[812px] flex-col gap-48 pb-16 xl:flex-1 xl:flex-row xl:pb-0">
      <span class="horizontal-dashed-border h-1 w-full xl:hidden" />

      <span class="vertical-dashed-border hidden h-full w-1 xl:block" />

      <div class="flex h-full w-full flex-col gap-48 xl:gap-[170px] xl:py-48">
        {#if columns && columns.length > 0}
          <div
            class="grid w-full grid-cols-2 gap-x-24 gap-y-48 text-xs/snug xl:grid-cols-4 xl:gap-x-48 xl:gap-y-0"
          >
            {#each columns as column}
              {@const { title, links } = column}
              <div class="flex flex-col gap-[41px]">
                <p class="uppercase opacity-48">{title}</p>
                {#if links && links.length > 0}
                  <div class="flex flex-col gap-12">
                    {#each links as link}
                      {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
                      <Link {href} {target} {rel}>{link.title}</Link>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}

        <div
          class="flex h-full w-full flex-col justify-between gap-32 text-xs/snug xl:flex-row xl:items-end"
        >
          {#if links && links.length > 0}
            <div class="flex flex-col gap-12">
              {#each links as link}
                {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
                <Link {href} {target} {rel}>{link.title}</Link>
              {/each}
            </div>
          {/if}

          <span class="horizontal-dashed-border h-1 w-full xl:hidden" />

          <p>{string('footer.copyright')} {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  </div>
</footer>
