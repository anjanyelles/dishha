<script lang="ts">
  import Poligons from './assets/poligons.webp';
  import LeftHand from './assets/left-hand.webp';
</script>

<div
  class="pointer-events-none absolute -bottom-[100px] -left-[160px] hidden w-[350px] translate-x-[200px] xl:block"
>
  <img role="presentation" src={LeftHand} alt="" />
</div>

<div
  class="pointer-events-none absolute -bottom-[160px] -right-[160px] hidden w-[340px] -translate-x-[200px] xl:block"
>
  <img role="presentation" src={Poligons} alt="" />
</div>
