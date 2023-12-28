<script lang="ts" setup>
import { EditorPlayer } from "@/features";
import { computed } from "vue";
import { useRouter } from "vue-router";

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * Id игрока
 */
const playerId = computed(
  () => Number(router.currentRoute.value.params.id) || 0
);
</script>

<template>
  <EditorPlayer :player-id="playerId" />
</template>

<style lang="scss"></style>
