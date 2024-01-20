<script lang="ts" setup>
import { useMenuStore } from "@/entities";
import Logo from "@/shared/assets/img/logo.svg";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

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
   * * Маршрут
   */
  routerName: {
    type: String,
  },
});

const emit = defineEmits<{
  /**
   * * Клик
   */
  (e: "click"): void;
}>();

/**
 * * Маршруты
 */
const router = useRouter();
const route = useRoute();

/**
 * * Активен ли маршрут
 */
const isActive = computed(() => {
  if (!props.routerName) return false;

  const routeList = router.getRoutes();

  const currentParentPrefix = getParentPrefix(
    routeList.find((x) => x.name == route.name).path
  );

  const routerParentPrefix = getParentPrefix(
    routeList.find((x) => x.name == props.routerName).path
  );

  return currentParentPrefix == routerParentPrefix;
});

/**
 * * Префикс родительского элемента
 */
const getParentPrefix = (path: string) =>
  path.replace("/", "").split("/")[0] || null;

/**
 * * Клик
 */
const onClick = async () => {
  emit("click");
  if (props.routerName) {
    const menuStore = useMenuStore();

    if (menuStore.drawer) menuStore.changeMenu();
    router.push({ name: props.routerName });
  }
};
</script>

<template>
  <div class="icon-text" :class="{ active: isActive }" @click="onClick">
    <slot />
    <div class="text">{{ text }}</div>
  </div>

</template>

<style lang="scss">
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

  &:hover {
    .text {
      color: $lightest-red;
    }
    svg {
      fill: $lightest-red;
    }
  }

  @include media(">=tablet") {
    flex-direction: column;
    row-gap: 4px;
    .text {
      font-size: 12px;
    }
  }
}
</style>
