<script lang="ts" setup>
import { DetailsTeam } from "@/features";
import { computed } from "vue";
import { useRouter } from "vue-router";

/**
 * * Маршруты
 */
const router = useRouter();

/**
 * Id команды
 */
const teamId = computed(() => Number(router.currentRoute.value.params.id) || 0);
</script>

<template>
  <DetailsTeam :team-id="teamId" />
</template>

<style lang="scss"></style>
