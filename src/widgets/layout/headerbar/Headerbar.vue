<script lang="ts" setup>
import { Logo } from "@/shared";
import { UserAvatar } from "@/features";
import MenuIcon from "@/shared/assets/img/icons/menu.svg";
import { useMenuStore } from "@/entities";
/**
 * * Стор для работы с меню
 */
const menuStore = useMenuStore();
</script>

<template>
  <div class="header-wrap">
    <div class="menu">
      <img
        :src="MenuIcon"
        width="24"
        height="24"
        alt="Menu"
        @click="menuStore.changeMenu"
      />
    </div>
    <div class="header">
      <Logo />
      <UserAvatar class="custom-avatar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  min-height: 62px;
  height: 62px;
  background-color: $white;
  box-shadow: 0px 1px 10px 0px rgba($lightest-gray, 0.5);
  padding: 0 12px;
  position: fixed;
  width: 100%;
  z-index: 30;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu {
    cursor: pointer;
    position: absolute;
  }

  @include media("<tablet") {
    .custom-avatar {
      display: none;
    }
  }

  @include media(">=tablet") {
    min-height: 80px;
    height: 80px;
    padding: 0 51px;
    .menu {
      display: none;
    }
    .header {
      justify-content: space-between;
    }
  }
}
</style>
