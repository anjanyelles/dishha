<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  role="presentation"
  class={cn(
    'min-h-[372px] w-[272px] min-w-[272px] rounded-2xl bg-gradient-to-b from-[hsl(var(--color-highlight)/0.9)] to-[hsl(var(--color-highlight)/0.4)] opacity-8',
    className
  )}
></div>
