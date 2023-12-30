<script lang="ts" setup>
import { DetailsPlayer } from "@/features";
import { computed } from "vue";
import { useRouter } from "vue-router";

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * Id игрока
 */
const playerId = computed(() => Number(router.currentRoute.value.params.id) || 0);
</script>

<template>
  <DetailsPlayer :player-id="playerId" />
</template>

<style lang="scss"></style>
