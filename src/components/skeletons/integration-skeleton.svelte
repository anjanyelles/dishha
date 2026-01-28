<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  role="presentation"
  class={cn(
    'h-[190px] w-[368px] rounded-2xl bg-gradient-to-b from-[hsl(var(--color-highlight)/0.9)] to-[hsl(var(--color-highlight)/0.4)] p-48 opacity-8',
    className
  )}
></div>
