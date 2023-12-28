<script lang="ts" setup>
import Logo from "@/shared/assets/img/logo.svg";
</script>

<template>
  <div class="logo">
    <img :src="Logo" alt="Logo" />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 137px;
  height: 34px;

  > img {
    width: 100%;
    height: 100%;
  }

  @include media(">=tablet") {
    width: 191px;
    height: 48px;
  }
}
</style>
