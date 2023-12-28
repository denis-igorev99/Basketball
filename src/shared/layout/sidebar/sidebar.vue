<script lang="ts" setup>
import { IconText } from "@/shared";
import { UserAvatar } from "@/features";
import { onMounted, onUnmounted, ref } from "vue";
import { useMenuStore, useUserStore } from "@/entities";
import { storeToRefs } from "pinia";

/**
 * * Стор для работы с меню
 */
const { drawer } = storeToRefs(useMenuStore());
const menuStore = useMenuStore();

/**
 * * Стор для работы с пользователем
 */
const userStore = useUserStore();

/**
 * * Закрыть меню
 */
const closeMenu = () => {
  menuStore.drawer = false;
};

/**
 * * Выйти из аккаунта
 */
const onLogout = () => {
  userStore.logout();
};

onMounted(() => {
  window.addEventListener("resize", closeMenu);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeMenu);
});
</script>

<template>
  <nav class="nav" :class="{ showing: drawer }">
    <div class="sidebar">
      <div class="sidebar-drawer">
        <div class="sidebar-content">
          <div class="custom-user-avatar">
            <UserAvatar class="custom-menu-avatar" />
          </div>

          <div class="menu-items">
            <div>
              <IconText text="Teams" router-name="teams-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.9898 8C10.9898 9.66 9.6598 11 7.9998 11C6.3398 11 4.9998 9.66 4.9998 8C4.9998 6.34 6.3398 5 7.9998 5C9.6598 5 10.9898 6.34 10.9898 8ZM18.9899 8C18.9899 9.66 17.6599 11 15.9999 11C14.3399 11 12.9999 9.66 12.9999 8C12.9999 6.34 14.3399 5 15.9999 5C17.6599 5 18.9899 6.34 18.9899 8ZM7.99988 13C5.66988 13 0.999878 14.17 0.999878 16.5V18C0.999878 18.55 1.44988 19 1.99988 19H13.9999C14.5499 19 14.9999 18.55 14.9999 18V16.5C14.9999 14.17 10.3299 13 7.99988 13ZM15.03 13.05C15.38 13.02 15.71 13 16 13C18.33 13 23 14.17 23 16.5V18C23 18.55 22.55 19 22 19H16.82C16.93 18.69 17 18.35 17 18V16.5C17 15.03 16.21 13.92 15.07 13.09C15.0669 13.0869 15.0639 13.083 15.0606 13.0787C15.053 13.0688 15.0439 13.0569 15.03 13.05Z"
                  />
                </svg>
              </IconText>
              <IconText text="Players" router-name="players-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.9998 8C15.9998 10.21 14.2098 12 11.9998 12C9.7898 12 7.9998 10.21 7.9998 8C7.9998 5.79 9.7898 4 11.9998 4C14.2098 4 15.9998 5.79 15.9998 8ZM3.99988 18C3.99988 15.34 9.32988 14 11.9999 14C14.6699 14 19.9999 15.34 19.9999 18V19C19.9999 19.55 19.5499 20 18.9999 20H4.99988C4.44988 20 3.99988 19.55 3.99988 19V18Z"
                  />
                </svg>
              </IconText>
            </div>

            <IconText
              class="custom-icon-text"
              text="Sign out"
              router-name="sign-in"
              @click="onLogout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 3.01001H21C22.1 3.01001 23 3.91001 23 5.01001V18.99C23 20.09 22.1 20.99 21 20.99H2.98C1.89 20.99 1 20.1 1 19.01V16C1 15.45 1.45 15 2 15C2.55 15 3 15.45 3 16V18.02C3 18.57 3.45 19.02 4 19.02H20C20.55 19.02 21 18.57 21 18.02V5.99001C21 5.44001 20.55 4.99001 20 4.99001H4C3.45 4.99001 3 5.44001 3 5.99001V8.00001C3 8.55001 2.55 9.00001 2 9.00001C1.45 9.00001 1 8.55001 1 8.00001V5.01001C1 3.91001 1.9 3.01001 3 3.01001ZM14.64 12.3601L11.85 15.1501C11.54 15.4601 11 15.2401 11 14.7901V13.0001H2C1.45 13.0001 1 12.5501 1 12.0001C1 11.4501 1.45 11.0001 2 11.0001H11V9.21005C11 8.76005 11.54 8.54005 11.85 8.86005L14.64 11.6501C14.84 11.8501 14.84 12.1601 14.64 12.3601Z"
                />
              </svg>
            </IconText>
          </div>
        </div>
      </div>
      <Transition name="vas-fade">
        <div
          v-if="drawer"
          class="over-layer"
          @click="menuStore.changeMenu"
        ></div>
      </Transition>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.nav {
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;

    .sidebar-drawer {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background-color: $white;
      min-width: 200px;
      width: 200px;
      z-index: 1;
      position: fixed;
      top: 0;
      bottom: 0;
      padding-top: 80px;

      .sidebar-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .menu-items {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 24px 20px;
          > div:first-child {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            row-gap: 36px;
          }
        }
      }

      @include media("<tablet") {
        transition: all 0.15s ease-in-out;
        margin-left: -200px;

        .custom-user-avatar {
          padding: 16px;
          border-bottom: 1px solid $light-gray;
        }

        &.showing {
          margin-left: 0px;
        }
      }

      @include media(">=tablet") {
        min-width: 140px;
        width: 140px;

        .menu-items {
          padding: 32px 20px;
        }
      }

      .custom-menu-avatar {
        @include media(">=tablet") {
          display: none;
        }
      }
    }

    .over-layer {
      background-color: rgba(65, 65, 65, 0.6);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
  }

  @include media("<tablet") {
    &.showing {
      .sidebar-drawer {
        margin-left: 0px;
        z-index: 11;
        padding-top: 62px;
      }
    }
  }
}
</style>

<style lang="scss"></style>
