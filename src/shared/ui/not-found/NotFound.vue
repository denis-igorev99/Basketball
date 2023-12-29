<script lang="ts" setup>
import PageNotFoundImg from "@/shared/assets/img/page-not-found.svg";
</script>

<template>
  <div class="page-not-found-wrap">
    <div class="page-not-found">
      <img :src="PageNotFoundImg" alt="PageNotFound" />
      <div class="info">
        <div class="title">Page not found</div>
        <div class="description">
          Sorry, we can’t find what you’re looking for
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-not-found-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  background-color: $white;

  .page-not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 52px;
    img {
      width: 271.903px;
      height: 147.037px;
    }

    .info {
      display: flex;
      flex-direction: column;
      text-align: center;
      row-gap: 16px;
      .title {
        color: $lightest-red;
        font-size: 17px;
        font-weight: 800;
        line-height: 25px;
      }

      .description {
        color: $gray;
        font-size: 15px;
        font-weight: 400;
        line-height: 24px;
      }
    }

    @include media(">=tablet") {
      row-gap: 57px;
      img {
        width: 375.721px;
        height: 203.739px;
      }

      .info {
        row-gap: 24px;
        .title {
          font-size: 36px;
          line-height: 50px;
        }

        .description {
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
