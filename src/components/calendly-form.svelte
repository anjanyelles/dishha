<script lang="ts">
  import { cn } from '$lib/utils/tailwind';
  import { calendlyForm } from '$lib/actions/calendly';
  import { generateUniqueId } from '$lib/strings/utils';

  let id = generateUniqueId();

  export let calendar: string;

  let className: string | undefined = undefined;
  export { className as class };
</script>

{#if calendar}
  <div
    id="calendly-form-{id}"
    data-url={calendar}
    class={cn('calendly-inline-widget h-full', className)}
    use:calendlyForm={{
      id
    }}
  />
{/if}
