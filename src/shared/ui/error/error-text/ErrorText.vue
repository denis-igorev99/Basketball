<script lang="ts" setup>
import { useSlots } from "vue";
/**
 * * Настройка над слотом
 */
const slots = useSlots();
/**
 * * Заполнен ли слот
 */
const hasSlot = (name: string) => {
  return !!slots[name];
};
</script>

<template>
  <div class="error-text" v-if="hasSlot('default')">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.error-text {
  font-size: 12px;
  line-height: 14px;
  font-style: normal;
  font-weight: 500;
  color: $lightest-red;
  margin-top: 4px;
}
</style>
