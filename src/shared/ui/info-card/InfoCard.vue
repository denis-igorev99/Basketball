<script lang="ts" setup>
const props = defineProps({
  /**
   * * Текст
   */
  text: {
    type: String,
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
});
</script>

<template>
  <div class="info-card">
    <div class="content">
      <div class="preview">
        <img :src="imgUrl" alt="Avatar" />
      </div>
    </div>
    <div class="footer">
      <div class="title">
        {{ text }} <span><slot name="after-title" /></span>
      </div>
      <div class="subtitle">{{ description }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-card {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  aspect-ratio: 0.84;
  overflow: hidden;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    background: linear-gradient(122deg, $gray 1.62%, $dark-gray 81.02%);

    .preview {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      max-width: 58px;
      max-height: 50px;

      > img {
        width: 100%;
        max-height: 100%;
      }

      @include media(">tablet") {
        max-width: 150px;
        max-height: 150px;
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    background: $dark-gray;
    padding: 22px 8px;

    .title {
      font-size: 15px;
      line-height: 24px;
      color: $white;
      text-align: center;

      > span {
        color: $light-red;
      }

      @include media(">tablet") {
        font-size: 18px;
      }
    }

    .subtitle {
      font-size: 13px;
      line-height: 18px;
      color: $light-gray;
      text-align: center;

      @include media(">tablet") {
        font-size: 14px;
      }
    }

    @include media(">tablet") {
      row-gap: 12px;
    }
  }

  @include media(">tablet") {
    aspect-ratio: 0.94;
  }

  @include media(">large-desktop") {
    aspect-ratio: 0.958;
  }

  &.player-card {
    .content {
      align-items: flex-end;
      .preview {
        padding: 0 24px;
        max-width: none;
        max-height: none;
        @include media(">tablet") {
          padding: 0 45px;
        }
      }
    }
  }
}
</style>
