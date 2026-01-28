<script lang="ts">
  import Right from './assets/right.webp';
  import Left from './assets/left.webp';
</script>

<div
  class="pointer-events-none absolute -left-[160px] bottom-[100px] hidden w-[350px] translate-x-[200px] xl:block"
>
  <img role="presentation" src={Left} alt="" />
</div>

<div
  class="pointer-events-none absolute -right-[160px] bottom-[100px] hidden w-[340px] -translate-x-[200px] xl:block"
>
  <img role="presentation" src={Right} alt="" />
</div>
