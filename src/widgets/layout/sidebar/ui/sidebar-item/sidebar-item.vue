<script lang="ts" setup>
import { IconText, Link } from "@/shared";
import { UserAvatar } from "@/features";
import { storeToRefs } from "pinia";

const props = defineProps({
  /**
   * * Текст
   */
  text: {
    type: String,
  },
  /**
   * * Маршрут
   */
  routerName: {
    type: String,
  },
});
</script>

<template>
  <Link
    :router-name="routerName"
    :query-params="{ page: 1 }"
    :is-underline="false"
  >
    <IconText :text="text" :router-name="routerName">
      <slot />
    </IconText>
  </Link>
</template>
<style lang="scss" scoped></style>
