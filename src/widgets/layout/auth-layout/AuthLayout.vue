<script lang="ts" setup>
import { useUserStore } from "@/entities";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * * Стор для работы с пользователем
 */
const userStore = useUserStore();

onMounted(() => {
  if (userStore.isAuthorized) {
    router.push({ name: "teams-list" });
  }
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-x" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped></style>
