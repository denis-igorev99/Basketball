<script lang="ts" setup>
import { ICheckboxProps } from "@/shared/ui/checkbox/interface";
import { ErrorText } from "@/shared";
import { computed } from "vue";

const props = withDefaults(defineProps<ICheckboxProps>(), {
  modelValue: false,
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: boolean): void;
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
  <div class="ui-checkboc-wrap">
    <label
      class="ui-checkbox"
      :class="[{ disabled: disabled }, { error: isError }]"
    >
      <input v-model="value" type="checkbox" :disabled="disabled" />
      <slot />
    </label>
    <ErrorText v-if="error">{{ error }}</ErrorText>
  </div>
</template>

<style lang="scss" scoped>
.ui-checkboc-wrap {
  width: 100%;
  user-select: none;
  .ui-checkbox {
    display: inline-flex;
    align-items: center;
    column-gap: 10px;
    color: $gray;
    cursor: pointer;

    input[type="checkbox"] {
      width: 12px;
      height: 12px;
      border: 1px solid $light-gray;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 2px;
      transition: all 0.15s ease-in;

      &:disabled {
        border-color: $lightest-gray;
        background-color: $superlight-gray;
        cursor: no-drop;
      }

      &:checked {
        border: none;
        height: 12px;
        width: 12px;
        font-size: 14px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Im1hc3Rlci9jaGVja2JveC9uby1sYWJlbCI+CjxyZWN0IGlkPSJQbGF0ZSIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEuNSIgZmlsbD0iI0U0MTYzQSIgc3Ryb2tlPSIjRTQxNjNBIi8+CjxwYXRoIGlkPSJQYXRoIiBkPSJNNS42NDYyNCA4LjM5NjI1QzUuNDUxMjQgOC41OTEyNSA1LjEzNjI0IDguNTkxMjUgNC45NDEyNCA4LjM5NjI1TDMuMTQ2MjQgNi42MDEyNUMzLjA1MjYyIDYuNTA3ODMgMyA2LjM4MTAxIDMgNi4yNDg3NUMzIDYuMTE2NDkgMy4wNTI2MiA1Ljk4OTY3IDMuMTQ2MjQgNS44OTYyNUMzLjM0MTI0IDUuNzAxMjUgMy42NTYyNCA1LjcwMTI1IDMuODUxMjQgNS44OTYyNUw1LjI5MTI0IDcuMzM2MjVMOC43MzEyNCAzLjg5NjI1QzguOTI2MjQgMy43MDEyNSA5LjI0MTI0IDMuNzAxMjUgOS40MzYyNCAzLjg5NjI1QzkuNjMxMjQgNC4wOTEyNSA5LjYzMTI0IDQuNDA2MjUgOS40MzYyNCA0LjYwMTI1TDUuNjQ2MjQgOC4zOTYyNVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+Cg==);
        &:disabled {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Im1hc3Rlci9jaGVja2JveC9uby1sYWJlbCI+CjxyZWN0IGlkPSJQbGF0ZSIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEuNSIgZmlsbD0iI0QxRDFEMSIgc3Ryb2tlPSIjRDFEMUQxIi8+CjxwYXRoIGlkPSJQYXRoIiBkPSJNNS42NDYyNCA4LjM5NjI1QzUuNDUxMjQgOC41OTEyNSA1LjEzNjI0IDguNTkxMjUgNC45NDEyNCA4LjM5NjI1TDMuMTQ2MjQgNi42MDEyNUMzLjA1MjYyIDYuNTA3ODMgMyA2LjM4MTAxIDMgNi4yNDg3NUMzIDYuMTE2NDkgMy4wNTI2MiA1Ljk4OTY3IDMuMTQ2MjQgNS44OTYyNUMzLjM0MTI0IDUuNzAxMjUgMy42NTYyNCA1LjcwMTI1IDMuODUxMjQgNS44OTYyNUw1LjI5MTI0IDcuMzM2MjVMOC43MzEyNCAzLjg5NjI1QzguOTI2MjQgMy43MDEyNSA5LjI0MTI0IDMuNzAxMjUgOS40MzYyNCAzLjg5NjI1QzkuNjMxMjQgNC4wOTEyNSA5LjYzMTI0IDQuNDA2MjUgOS40MzYyNCA0LjYwMTI1TDUuNjQ2MjQgOC4zOTYyNVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+Cg==);
        }
      }
    }

    &:not(.disabled):hover {
      input[type="checkbox"] {
        border-color: $red;
      }
    }

    &.error {
      color: $lightest-red;
      input[type="checkbox"] {
        border-color: $lightest-red;
      }
    }

    &.disabled {
      color: $lightest-gray;
      cursor: no-drop;
    }
  }
}
</style>
