<script lang="ts" setup>
import { useNotificationStore } from "@/entities";
import { storeToRefs } from "pinia";

/**
 * * Стор для работы с уведомлениями
 */
const { notifications } = storeToRefs(useNotificationStore());
</script>

<template>
  <div class="notification-wrap">
    <TransitionGroup name="list" tag="ul">
      <li
        v-for="(notification, index) in notifications"
        :key="index"
        :class="notification.Type"
      >
        {{ notification.Text }}
      </li>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.notification-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 5000;

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    padding: 0;
    margin: 0;
    li {
      padding: 8px 16px;
      border-radius: 4px;
      color: $white;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;

      &.info {
        background-color: $light-green;
      }

      &.error {
        background-color: $light-red;
      }
    }
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }

  @include media("<tablet") {
    left: 12px;
    right: 12px;
    bottom: 12px;
    ul {
      row-gap: 8px;
    }
  }

  @include media(">=tablet") {
    right: 36px;
    top: 36px;
    ul {
      row-gap: 16px;
    }
  }
}
</style>
