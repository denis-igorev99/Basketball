<script lang="ts" setup>
import { ICheckboxProps } from "@/shared/ui/checkbox/interface";
import { ErrorText } from "@/shared";
import { computed } from "vue";
import { ILinkProps } from "@/shared/ui/link/interface";

const props = withDefaults(defineProps<ILinkProps>(), {
  disabled: false,
  isUnderline: true,
});

/**
 * * Переход по ссылка, если ссылка заблокирована - останавливаем всплытие события
 */
const checkClick = (e: Event) => {
  if (props.disabled) e.preventDefault();
};
</script>

<template>
  <RouterLink
    v-if="routerName"
    class="ui-link"
    :class="{ 'ui-link__underlined': isUnderline }"
    :to="{ name: routerName, query: querParams }"
    v-bind="$attrs"
    @click="checkClick"
  >
    <slot />
  </RouterLink>
  <span class="router-link" v-else><slot /></span>
</template>

<style lang="scss" scoped>
.ui-link {
  color: $red;
  cursor: pointer;
  text-decoration: none;

  &__underlined {
    text-decoration: underline;
  }

  &:not(.disabled):hover {
    text-decoration: none;
  }

  &.disabled {
    color: $lightest-gray;
    cursor: no-drop;
  }
}

.router-link {
  color: $red;
  font-size: 14px;
  line-height: 24px;
}
</style>
