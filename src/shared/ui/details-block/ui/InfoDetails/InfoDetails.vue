<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  /**
   * * Заголовок
   */
  titleText: { type: String },
  /**
   * * Описание
   */
  description: { type: String },
});
</script>

<template>
  <div class="info-details">
    <div class="title">{{ titleText }}</div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<style lang="scss" scoped>
.info-details {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: $white;
  .title {
    font-size: 17px;
    font-weight: 800;
    line-height: 25px;
  }

  .description {
    font-size: 15px;
    line-height: 24px;
  }

  @include media(">=large-desktop") {
    .title {
      font-size: 24px;
      line-height: 33px;
    }

    .description {
      font-size: 18px;
      line-height: 25px;
    }
  }
}
</style>
