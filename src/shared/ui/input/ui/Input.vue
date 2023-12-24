<script lang="ts" setup>
import { computed, InputHTMLAttributes, onMounted, ref } from "vue";
import { IInputProps } from "@/shared/ui/input/interface";
import { ErrorText } from "@/shared";

const props = withDefaults(defineProps<IInputProps>(), {
  inputLabel: "",
  error: "",
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: any): void;
}>();

/**
 * * Значение
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="ui-input-wrap" :class="{ 'show-error': !!error }">
    <div class="title">
      {{ inputLabel }}
    </div>
    <input class="ui-input" v-model="value" v-bind="$attrs" />
    <ErrorText>{{ error }}</ErrorText>
  </div>
</template>

<style lang="scss" scoped>
.ui-input-wrap {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  .title {
    color: $gray;
    margin-bottom: 8px;
  }

  .ui-input {
    padding: 7px 12px;
    border-radius: 4px;
    width: 100%;
    background: $superlight-gray;
    border: 1px solid $superlight-gray;
    outline: none;
    color: $dark-gray;
    min-height: 40px;
    transition: all 0.15s ease-in;

    &:hover {
      background: $lightest-gray;
      border-color: $lightest-gray;
    }

    &:focus {
      background: $superlight-gray;
      border-color: $superlight-gray;
      box-shadow: 0px 0px 5px 0px #d9d9d9;
    }

    &:disabled {
      color: $lightest-gray;
    }

    &::placeholder {
      color: $gray;
      font-size: 14px;
    }
  }

  &.show-error {
    .ui-input {
      border-color: $lightest-red;
    }
  }
}
</style>
