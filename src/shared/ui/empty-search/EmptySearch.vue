<script lang="ts" setup>
const props = defineProps({
  /**
   * * Текст
   */
  text: {
    type: String,
    default: "Empty here",
  },
  /**
   * * Описание
   */
  description: {
    type: String,
  },
  /**
   * * Изображение
   */
  imgUrl: { type: String },
  /**
   * * Максимальная ширина картинка
   */
  maxImgWidth: { type: String, default: "482px" },
});
</script>

<template>
  <div class="empty-search-wrap">
    <div class="block">
      <div class="preview" :style="{ maxWidth: maxImgWidth }">
        <img :src="imgUrl" alt="Preview" />
      </div>
      <div class="info">
        <div class="title">{{ text }}</div>
        <div class="description">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty-search-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 1;

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 48px;
    background: $white;
    padding: 48px 18px;
    max-width: 556px;

    .preview {
      width: 100%;

      > img {
        width: 100%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 24px;
      .title {
        color: $lightest-red;
        font-size: 17px;
        font-weight: 800;
        line-height: 25px;
        text-align: center;
      }

      .description {
        color: $gray;
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
      }
    }
    @include media(">=desktop") {
      border-radius: 15px;
      padding: 48px 37px;
      .info {
        .title {
          font-size: 36px;
          line-height: 38px;
        }
        .description {
          font-size: 24px;
          line-height: 26px;
        }
      }
    }
  }

  @include media(">=desktop") {
    justify-content: center;
  }
}
</style>
