<script lang="ts">
  import { page } from '$app/stores';

  import { dev } from '$app/environment';
  let dismissed = false;
  const isDraft = $page.data.version === 'draft';
</script>

{#if isDraft && !dismissed && !dev}
  <div
    class="fixed bottom-4 left-4 z-50 flex flex-col items-stretch rounded-24 border bg-foreground p-20 text-background"
  >
    <header class="mb-2 flex items-center justify-between">
      <h4 class="text-base font-medium">Warning</h4>
      <button class="text-xs" on:click={() => (dismissed = true)}>X</button>
    </header>
    <p class="mb-4">You're viewing a draft version</p>
    <a
      class="rounded-lg w-fit border border-foreground px-4 py-2"
      data-sveltekit-preload-data="off"
      href="/api/exit-preview?return_to={encodeURIComponent($page.url.pathname)}"
    >
      Published version
    </a>
  </div>
{/if}
