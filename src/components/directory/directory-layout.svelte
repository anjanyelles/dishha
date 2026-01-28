<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    submit: Event & { currentTarget: EventTarget & HTMLFormElement };
  }>();
</script>

<form
  class="overflow-hidden"
  method="get"
  data-sveltekit-noscroll
  on:change={(e) => {
    dispatch('submit', e);
    e.currentTarget.requestSubmit();
  }}
>
  <div class="relative flex flex-col xl:mx-auto xl:max-w-container">
    <div class="flex flex-col md:flex-row md:gap-50">
      <slot name="aside" />
      <slot name="directory" />
    </div>
  </div>
</form>
