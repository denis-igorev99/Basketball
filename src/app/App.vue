<script lang="ts" setup>
import { Notifications } from "@/features";
</script>

<template>
  <router-view />
  <Notifications />
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.slide-x-enter-active,
.slide-x-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.3s;
  opacity: 1;
}

.slide-x-enter-from,
.slide-x-leave-to {
  opacity: 0;
}

.slide-x-enter-from {
  transform: translateX(100px);
}

.slide-x-leave-to {
  transform: translateX(-100px);
}
</style>
