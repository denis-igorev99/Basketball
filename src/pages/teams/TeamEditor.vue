<script lang="ts" setup>
import { EditorTeam } from "@/features";
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
  <EditorTeam :team-id="teamId" />
</template>

<style lang="scss"></style>
