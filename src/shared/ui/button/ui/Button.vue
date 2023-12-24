<script lang="ts" setup>
import { IButtonProps } from "@/shared/ui/button/interface";
import { ErrorText } from "@/shared";

const props = withDefaults(defineProps<IButtonProps>(), {
  iconRight: "",
  buttonColor: "primary",
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button class="ui-button" :class="buttonColor" @click="emit('click')">
    <slot />
    <img
      v-if="iconRight"
      :src="iconRight"
      width="16"
      height="16"
      alt="IconRight"
    />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid;
  padding: 0 24px;
  transition: all 0.15s ease-in;
  font-size: 15px;
  line-height: 24px;

  &.default {
    color: $light-gray;
    border-color: $light-gray;
    background-color: $white;

    &:hover {
      background-color: $lightest-gray;
    }

    &:focus {
      border-color: $gray;
      background-color: $light-gray;
      color: $gray;
    }

    &:disabled {
      border-color: $light-gray;
      background-color: $superlight-gray;
      color: $lightest-gray;
      cursor: no-drop;
    }
  }

  &.primary {
    color: $white;
    background-color: $red;
    border: none;

    &:hover {
      background-color: $light-red;
    }

    &:focus {
      background-color: $dark-red;
    }

    &:disabled {
      background-color: $superlight-gray;
      color: $lightest-gray;
      cursor: no-drop;
    }
  }
}
</style>
