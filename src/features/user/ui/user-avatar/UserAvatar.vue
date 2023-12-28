<script lang="ts" setup>
import { useUserStore } from "@/entities";
import { Avatar } from "@/shared";
import { storeToRefs } from "pinia";

/**
 * * Стор для работы с пользователем
 */
const { user } = storeToRefs(useUserStore());
</script>

<template>
  <Avatar :avatar-name="user.Name" :imageUrl="user.AvatarUrl" />
</template>

<style lang="scss" scoped></style>
