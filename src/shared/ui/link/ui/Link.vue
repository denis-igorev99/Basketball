<script lang="ts" setup>
import { ICheckboxProps } from "@/shared/ui/checkbox/interface";
import { ErrorText } from "@/shared";
import { computed } from "vue";
import { ILinkProps } from "@/shared/ui/link/interface";

const props = withDefaults(defineProps<ILinkProps>(), {
  disabled: false,
});

/**
 * * Переход по ссылка, если ссылка заблокирована - останавливаем всплытие события
 */
const checkClick = (e: Event) => {
  if (props.disabled) e.preventDefault();
};
</script>

<template>
  <a
    class="ui-link"
    :class="{ disabled: disabled }"
    v-bind="$attrs"
    @click="checkClick"
    ><slot
  /></a>
</template>

<style lang="scss" scoped>
.ui-link {
  color: $red;
  text-decoration: underline;

  &:not(.disabled):hover {
    text-decoration: none;
  }

  &.disabled {
    color: $lightest-gray;
    cursor: no-drop;
  }
}
</style>
