<script lang="ts">
  import SecondaryLeft from './assets/secondary-left.webp';
  import PrimaryRight from './assets/secondary-right.webp';
</script>

<div class="pointer-events-none absolute -left-[100px] top-[90px] hidden w-[420px] xl:block">
  <img role="presentation" src={SecondaryLeft} alt="" />
</div>

<div class="pointer-events-none absolute -right-[100px] top-[110px] hidden w-[380px] xl:block">
  <img role="presentation" src={PrimaryRight} alt="" />
</div>
