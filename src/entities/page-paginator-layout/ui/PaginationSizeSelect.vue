<script lang="ts" setup>
import { ICheckboxProps } from "@/shared/ui/checkbox/interface";
import { Select, SelectItemModel } from "@/shared";
import { computed } from "vue";

const props = defineProps({
  /**
   * * Кол-во
   */
  modelValue: {
    type: Number,
  },
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: number): void;
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

/**
 * * Опции
 */
const options = [
  new SelectItemModel({
    Id: 6,
    Value: "6",
  }),
  new SelectItemModel({
    Id: 12,
    Value: "12",
  }),
  new SelectItemModel({
    Id: 24,
    Value: "24",
  }),
];
</script>

<template>
  <Select class="pagination-size-select" v-model="value" :options="options" />
</template>

<style lang="scss">
.ui-select-wrap {
  cursor: pointer;
  &.pagination-size-select {
    .multiselect {
      min-height: 28px;
      .multiselect__input {
        width: 0px;
      }
      .multiselect__tags {
        min-height: 28px;
        padding-top: 2px !important;
        padding-left: 13px !important;
        padding-right: 36px !important;
      }
      .multiselect__single {
        text-align: center;
        width: 9px;
        margin-bottom: 0;
      }
      .custom-expand {
        column-gap: 4px;
        right: 4px;
      }

      @include media(">desktop") {
        min-width: 88px;
        .multiselect__tags {
          min-height: 40px;
          padding-top: 7px !important;
          padding-left: 20px !important;
          padding-right: 56px !important;
        }

        .custom-expand {
          column-gap: 6px;
          right: 6px;
          > img {
            min-width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
