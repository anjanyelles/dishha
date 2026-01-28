<script lang="ts" context="module">
  export const navbarInfo = writable<{ rect: DOMRect } | null>(null);
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { circInOut } from 'svelte/easing';
  import { fly, slide } from 'svelte/transition';
  import { beforeNavigate } from '$app/navigation';
  import type { NavigationConfigurationStoryblok } from '$types/bloks';

  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';
  import { smallDesktop } from '$lib/utils/media';
  import { scrollLock } from '$lib/utils/scroll-lock';
  import { createMediaStore } from '$lib/stores/media';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { clickOutside } from '$lib/actions/click-outside';
  import scrollDirection from '$lib/stores/scroll-direction';

  import Logo from '$components/ui/logo.svelte';
  import Link from '$components/ui/link.svelte';
  import Button from '$components/ui/button.svelte';
  import Icon, { getValidIcon } from '$components/ui/icon/icon.svelte';

  import PanelHeader from '$components/topnav/panel-header.svelte';
  import FeaturesPanel from '$components/topnav/features-panel.svelte';
  import FeaturesAndListPanel from '$components/topnav/features-and-list-panel.svelte';
  import ListAndHighlightedFeaturePanel from '$components/topnav/list-and-highlighted-feature-panel.svelte';
  import { getAccentTheme } from '$lib/utils/themes';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let ref: HTMLElement;
  export let data: NavigationConfigurationStoryblok;

  $: ({ mobile_header, links, ctas } = data);
  $: story = $page.data.story;

  $: theme = getAccentTheme(story?.content?.theme);

  let scrollY = 0;
  let activePanelIndex = -1;
  let isMobileMenuOpen = false;

  const isMobile = createMediaStore(smallDesktop);

  $: scrollLock(isMobileMenuOpen || !isMobile);

  beforeNavigate(() => {
    isMobileMenuOpen = false;
    activePanelIndex = -1;
  });

  const panelTransition = (
    node: HTMLElement,
    options: { duration: number; direction: 'in' | 'out' }
  ) => {
    if ($isMobile) {
      return fly(node, { duration: options.duration, x: '100vw', easing: circInOut });
    }

    return slide(node, {
      duration: options.duration,
      delay: options.direction === 'in' ? 100 : 0,
      easing: circInOut
    });
  };

  onMount(() => {
    if (ref) {
      navbarInfo.set({ rect: ref.getBoundingClientRect() });
    }
  });
</script>

<svelte:window
  bind:scrollY
  on:resize={() => {
    const rect = ref?.getBoundingClientRect();

    if (!rect) return;

    navbarInfo.update((prev) => ({ ...prev, rect }));
  }}
  on:scroll={() => {
    const rect = ref?.getBoundingClientRect();

    if (!rect) return;

    navbarInfo.update((prev) => ({ ...prev, rect }));
  }}
/>

<div
  bind:this={ref}
  data-theme={isMobileMenuOpen ? theme : story?.content?.theme}
  use:clickOutside={() => {
    activePanelIndex = -1;
  }}
  class={cn(
    'ease-motion fixed left-0 top-0 z-top-nav w-full border-b border-foreground border-opacity-4 bg-transparent transition-transform duration-300 xl:border-b-none',
    {
      'translate-y-0': $scrollDirection === 'up',
      '-translate-y-top-nav':
        $scrollDirection === 'down' && scrollY > 100 && activePanelIndex === -1,
      'bg-background xl:border-b xl:border-foreground xl:border-opacity-4':
        $scrollDirection === 'down' || scrollY !== 0 || isMobileMenuOpen
    }
  )}
>
  <header class="relative">
    <div
      class="xl:rounded-0 flex h-top-nav-mobile w-full items-center justify-center rounded-b-2 xl:h-top-nav"
    >
      <div
        class="flex w-full max-w-container items-center justify-between px-20 xl:h-[76px] xl:px-48"
      >
        {#if isMobileMenuOpen && activePanelIndex !== -1}
          <button
            aria-label="Menu button"
            class="flex items-center gap-8 text-foreground xl:hidden"
            on:click={() => {
              activePanelIndex = -1;
            }}
          >
            <Icon size={20} icon="chevron-left" />

            {string('back')}
          </button>
        {:else}
          <a aria-label="Homepage link | Frankli Logo" href="/">
            <Logo class="size-40" />
          </a>
        {/if}

        <!-- Navigation -->
        <div
          role="navigation"
          on:mouseleave={() => {
            if (!$isMobile) activePanelIndex = -1;
          }}
        >
          <nav
            data-theme={story?.content?.theme || 'light'}
            class="absolute left-1/2 top-0 hidden h-top-nav-mobile -translate-x-1/2 gap-32 xl:flex xl:h-top-nav"
          >
            {#each links as item, i}
              {@const { small_title, title } = item}
              {#if item.component === 'link'}
                {@const { href, target, rel } = getAnchorFromCmsLink(item.link)}
                <Link size="medium" {href} {target} {rel}>{title}</Link>
              {:else}
                <button
                  class={cn(
                    'group relative flex h-full items-center gap-4 overflow-hidden text-sm/snug font-normal tracking-wide text-foreground'
                  )}
                  on:keydown={() =>
                    activePanelIndex !== i ? (activePanelIndex = i) : (activePanelIndex = -1)}
                  on:mouseenter={() => (activePanelIndex = i)}
                >
                  {small_title}

                  <Icon
                    size={20}
                    icon="chevron-down"
                    class={cn(
                      'flex-shrink-0 transition-transform duration-300 group-hover:rotate-180',
                      activePanelIndex === i && 'rotate-180'
                    )}
                  />
                </button>
              {/if}
            {/each}
          </nav>

          {#if $isMobile && isMobileMenuOpen}
            <nav
              data-theme={theme}
              in:slide={{ duration: 300, delay: 100 }}
              out:slide={{ duration: 100 }}
              class="fixed left-0 right-0 top-top-nav-mobile z-10 flex h-[calc(100dvh-theme(spacing.top-nav-mobile))] flex-col justify-between overflow-auto bg-background p-8 pb-48 xl:hidden"
            >
              {#if mobile_header && mobile_header[0]}
                <PanelHeader data={mobile_header[0]} class="h-fit" />
              {/if}

              <div class="flex h-full w-full flex-col justify-start pt-32">
                {#each links as item, i}
                  {@const { small_title } = item}
                  {@const style =
                    'flex w-full items-center justify-between font-serif text-xl/snug text-foreground px-20 py-24 last:pb-0'}
                  {#if item.component === 'link'}
                    {@const { href, target, rel } = getAnchorFromCmsLink(item.link)}
                    <a
                      on:mouseenter={() => (activePanelIndex = -1)}
                      class={cn(style)}
                      {href}
                      {target}
                      {rel}
                    >
                      {item.title}
                      <Icon size={20} icon="chevron-right" />
                    </a>
                  {:else}
                    <button
                      class={cn(style)}
                      on:click={() => (activePanelIndex = activePanelIndex === i ? -1 : i)}
                    >
                      {small_title}
                      <Icon size={20} icon="chevron-right" />
                    </button>
                  {/if}

                  <span class="horizontal-dashed-border h-1 w-full last:hidden xl:hidden" />
                {/each}
              </div>
            </nav>
          {/if}

          {#if links[activePanelIndex]}
            {@const item = links[activePanelIndex]}
            <div
              data-theme={theme}
              in:panelTransition={{ duration: 200, direction: 'in' }}
              out:panelTransition={{ duration: 100, direction: 'out' }}
              class="fixed left-1/2 top-top-nav-mobile z-navbar-drawer h-[calc(100dvh-theme(spacing.top-nav-mobile))] w-full -translate-x-1/2 translate-y-0 overflow-auto bg-background xl:top-top-nav xl:h-[266px] xl:w-[1112px] xl:rounded-24 xl:border xl:border-foreground"
            >
              {#if item.component === 'panel-three-pages'}
                <FeaturesPanel data={item} />
              {:else if item.component === 'panel-two-pages'}
                <FeaturesAndListPanel data={item} />
              {:else if item.component === 'panel-highlighted'}
                <ListAndHighlightedFeaturePanel data={item} />
              {/if}
            </div>
          {/if}
        </div>

        <!-- CTAs and Mobile Menu -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-32">
            {#each ctas as cta}
              {@const { link, title, variant, icon } = cta}
              {@const { href, target, rel } = getAnchorFromCmsLink(link)}

              {#if variant === 'text'}
                <Link
                  size="medium"
                  {href}
                  {target}
                  {rel}
                  class={cn($isMobile && activePanelIndex !== -1 && 'hidden')}>{title}</Link
                >
              {:else}
                <Button
                  as="a"
                  {href}
                  {target}
                  {rel}
                  icon={getValidIcon(icon)}
                  class="hidden h-full items-center xl:flex"
                >
                  {title}
                </Button>
              {/if}
            {/each}
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            aria-label="Menu button"
            class="ml-24 block text-foreground xl:hidden"
            on:click={() => {
              activePanelIndex = -1;
              isMobileMenuOpen = !isMobileMenuOpen;
            }}
          >
            <Icon size={24} icon={isMobileMenuOpen ? 'cross' : 'menu'} />
          </button>
        </div>
      </div>
    </div>
  </header>
</div>
