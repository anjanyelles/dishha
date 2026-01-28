<script lang="ts">
  import LeftPoligons from './assets/left-poligons.webp';
  import RightPoligons from './assets/right-poligons.webp';
</script>

<div
  class="pointer-events-none absolute -left-[300px] bottom-0 hidden w-[375px] translate-x-[200px] xl:block"
>
  <img role="presentation" src={LeftPoligons} alt="" />
</div>

<div
  class="pointer-events-none absolute -right-[360px] bottom-0 hidden w-[400px] -translate-x-[200px] xl:block"
>
  <img role="presentation" src={RightPoligons} alt="" />
</div>
