<script lang="ts" setup>
import { Headerbar, Sidebar } from "../";
</script>

<template>
  <div class="application-wrap">
    <Headerbar />
    <div class="application-content">
      <Sidebar />

      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="slide-x" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application-wrap {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;

  .application-content {
    display: flex;
    flex-grow: 1;
    height: 100%;
    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background: $superlight-gray;
      width: 100%;
      padding-top: 16px;
      margin-top: 62px;
      @include media(">=tablet") {
        padding: 32px;
        margin-top: 80px;
        margin-left: 140px;
      }

      @include media(">=large-desktop") {
        padding: 32px 80px;
      }
    }
  }
}
</style>
