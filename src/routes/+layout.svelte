<script lang="ts">
  import '../styles/index.css';

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  import { footer, topnav } from '$lib/content';
  import scrollDirection from '$lib/stores/scroll-direction';

  import Footer from '$components/footer.svelte';
  import Topnav from '$components/topnav/topnav.svelte';
  import DraftMode from '$components/draft-mode.svelte';
  import MediaIndicator from '$components/media-indicator.svelte';
  import GTM from '$components/gtm.svelte';

  $: storyTheme = $page.data?.story?.content?.theme || 'yellow';

  $: if (browser) {
    document.body.setAttribute('data-theme', storyTheme);
  }

  let scrollY = 0;
  let scrollYPrev = 0;

  $: {
    if (Math.abs(scrollY - scrollYPrev) > 20) {
      scrollDirection.set(scrollY > scrollYPrev ? 'down' : 'up');
    }
    scrollYPrev = scrollY;
  }

  const queryClient = new QueryClient();
</script>

<svelte:window bind:scrollY />

<GTM />

<QueryClientProvider client={queryClient}>
  <DraftMode />
  <MediaIndicator />

  {#if $topnav}
    <Topnav data={$topnav} />
  {/if}

  <div class="mt-top-nav-mobile lg:mt-top-nav">
    <slot />
  </div>

  {#if $footer}
    <Footer data={$footer} />
  {/if}
</QueryClientProvider>
