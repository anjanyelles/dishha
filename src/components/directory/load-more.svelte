<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { string } from '$lib/strings';
  import { cn } from '$lib/utils/tailwind';

  import Button from '$components/ui/button.svelte';

  export let loading: boolean;

  let className: string | undefined = undefined;
  export { className as class };

  const dispatch = createEventDispatcher<{ loadMore: undefined }>();
</script>

<div class={cn('flex flex-col items-center', className)}>
  <Button as="button" {loading} on:click={() => dispatch('loadMore')}>
    {string('resources.show-more')}
  </Button>
</div>
