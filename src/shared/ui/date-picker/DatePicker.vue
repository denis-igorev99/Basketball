<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { ErrorText } from "@/shared";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  /**
   * * Дата
   */
  modelValue: {
    type: Date,
  },
  /**
   * * Заголовок
   */
  label: {
    type: String,
  },
  /**
   * * Минимальная дата
   */
  minDate: {
    type: Object as PropType<Number | Date>,
  },
  /**
   * * Максимальная дата
   */
  maxDate: {
    type: Object as PropType<Number | Date>,
  },
  /**
   * * Ошибка
   */
  error: {
    type: String,
  },
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: Date): void;
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
  <div class="ui-datepicker-wrap" :class="{ 'show-error': !!error }">
    <div class="title" v-if="label">
      {{ label }}
    </div>
    <VueDatePicker
      class="datepicker"
      v-model="value"
      :enable-time-picker="false"
      :clearable="false"
      :min-date="minDate"
      :max-date="maxDate"
      auto-apply
    />
    <ErrorText v-if="error">{{ error }}</ErrorText>
  </div>
</template>

<style lang="scss">
.ui-datepicker-wrap {
  width: 100%;

  .dp__theme_light {
    &.datepicker {
      .dp__active_date,
      .dp__overlay_cell_active {
        background: $red;
      }

      .dp__today {
        border: 1px solid $light-gray;
      }

      .dp__calendar_item {
        color: $gray;
      }

      .dp__cell_offset {
        color: $light-gray;
      }

      .dp__date_hover_end,
      .dp__date_hover_start,
      .dp__date_hover,
      .dp__overlay_cell {
        transition: all 0.15s ease-in;

        &:hover {
          background: $lightest-red;
          color: $white;
        }
      }

      .dp__input {
        height: 40px;
        padding: 6px 30px 6px 12px;
      }

      .dp__input_wrap {
        .dp__pointer {
          background: $superlight-gray;
          border: 1px solid $superlight-gray;
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
        }
      }

      .dp__input_icon {
        inset-inline-start: auto;
        right: 0;
      }
    }
  }
  .title {
    color: $gray;
    margin-bottom: 8px;
  }
}
</style>
