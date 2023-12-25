<script lang="ts" setup>
import Logo from "@/shared/assets/img/logo.svg";

const props = defineProps({
  /**
   * * Иконка
   */
  icon: {
    type: String,
  },
  /**
   * * Текст
   */
  text: {
    type: String,
  },
  /**
   * * Активная иконка
   */
  isActive: { type: Boolean },
});
</script>

<template>
  <div class="icon-text" :class="{ active: isActive }">
    <slot />
    <div class="text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.icon-text {
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  user-select: none;

  .text {
    font-size: 13px;
    line-height: 18px;
    color: $light-gray;
  }

  svg {
    fill: $light-gray;
  }

  &.active {
    .text {
      color: $red;
    }

    svg {
      fill: $red;
    }
  }

  @include media(">tablet") {
    flex-direction: column;
    row-gap: 4px;
    .text {
      font-size: 12px;
    }
  }
}
</style>
