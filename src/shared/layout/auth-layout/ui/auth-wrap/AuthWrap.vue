<script lang="ts" setup></script>

<template>
  <div class="auth-wrap">
    <div class="auth-block">
      <div class="aith-wrap-content">
        <slot />
      </div>
      <div class="aith-wrap-media">
        <slot name="image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-height: 100vh;

  .auth-block {
    .aith-wrap-content {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $white;
      padding: 24px;
    }

    .aith-wrap-media {
      display: none;
    }

    @include media(">desktop") {
      display: flex;
      flex-grow: 1;
      // align-items: center;
      .aith-wrap-content {
        min-width: 606px;
        width: 606px;
        padding: 0 120px;
      }

      .aith-wrap-media {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        width: 100%;
        background: $light-blue;
      }
    }
  }
}
</style>
