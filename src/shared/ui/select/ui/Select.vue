<script lang="ts" setup>
import { ICheckboxProps } from "@/shared/ui/checkbox/interface";
import { ErrorText, SelectItemModel } from "@/shared";
import { computed, onMounted, PropType, ref, useAttrs } from "vue";
import { ISelectProps } from "@/shared/ui/select/interface";
import VueMultiselect from "vue-multiselect";
import ExpandIcon from "@/shared/assets/img/icons/expand_more_24.svg";
import CloseIcon from "@/shared/assets/img/icons/close.svg";
import CloseGrayIcon from "@/shared/assets/img/icons/close_gray.svg";

withDefaults(defineProps<ISelectProps>(), {
  modelValue: null,
  selectColor: "gray",
  multiple: false,
  options: () => [],
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: number | number[]): void;
}>();

const attrs = useAttrs();

/**
 * * Выбранная опция
 */
const selectedOption = computed(() => {
  if (attrs.multiple)
    return (attrs.options as SelectItemModel[]).filter((x) =>
      (attrs.modelValue as number[])?.includes(x.Id)
    );

  return (attrs.options as SelectItemModel[]).find(
    (x) => x.Id == attrs.modelValue
  );
});

/**
 * * Выбранные опции
 */
const innerOptions = computed(() =>
  hiddenOptionsCount.value
    ? [...(selectedOption.value as SelectItemModel[])].slice(
        0,
        -hiddenOptionsCount.value
      )
    : [...(selectedOption.value as SelectItemModel[])]
);

/**
 * * Обновить значение
 */
const onUpdateModelValue = (value: SelectItemModel | SelectItemModel[]) => {
  if (value instanceof SelectItemModel) {
    emit("update:modelValue", value?.Id);
  } else {
    emit(
      "update:modelValue",
      value?.map((x) => x.Id)
    );

    recalcHiddenOptionsDebounce();
  }
};

/**
 * * Удалить элемент
 */
const deleteItem = (id?: number) => {
  if (!id) {
    emit("update:modelValue", attrs.multiple ? [] : null);
    hiddenOptionsCount.value = 0;
    return;
  }

  emit(
    "update:modelValue",
    (attrs.modelValue as number[]).filter((x) => x != id)
  );

  recalcHiddenOptionsDebounce();
};

/**
 * * Кол-во опций, которые необходимо скрыть
 */
const hiddenOptionsCount = ref(0);

/**
 * * Пересчитать скрытые значения
 */
const recalcHiddenOptions = () => {
  const parentContainer = selectMultipleRef.value;

  if (!parentContainer) return;

  const parentWidth = parentContainer.offsetWidth;
  
  const children = (attrs.options as SelectItemModel[])
    .filter((x) => (attrs.modelValue as number[])?.includes(x.Id))
    .map((x) => x.Value);

  let totalWidth = 25;
  let count = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    totalWidth += child.length + 67;

    if (totalWidth > parentWidth) count++;
  }

  hiddenOptionsCount.value = count;
};

const recalcHiddenOptionsDebounce = () => {
  setTimeout(() => {
    recalcHiddenOptions();
  }, 200);
};

const selectMultipleRef = ref();

/**
 * Отслеживатель изменения размера
 */
const resizeObserver: ResizeObserver = new ResizeObserver(
  recalcHiddenOptionsDebounce
);

onMounted(() => {
  recalcHiddenOptionsDebounce();
  if (selectMultipleRef.value) {
    resizeObserver.observe(selectMultipleRef.value);
  }
});

const selectedWrapper = ref();
</script>

<template>
  <div class="ui-select-wrap">
    <div
      class="ui-select-block"
      :class="[
        selectColor,
        { multiple: attrs.multiple },
        { clearing: selectedOption?.Id || selectedOption?.length },
      ]"
    >
      <VueMultiselect
        class="ui-select"
        v-model="value"
        :model-value="selectedOption"
        :options="attrs.options"
        placeholder="Select..."
        :multiple="attrs.multiple"
        label="Value"
        track-by="Id"
        @update:model-value="onUpdateModelValue"
      >
        <template #caret>
          <div class="custom-expand">
            <img
              v-if="selectedOption?.Id || selectedOption?.length"
              :src="CloseGrayIcon"
              alt="Close"
              width="16"
              height="16"
              class="cs-p"
              @click="deleteItem()"
            />
            <div></div>
            <img :src="ExpandIcon" alt="Expand" width="16" height="16" />
          </div>
        </template>
        <template #selection v-if="attrs.multiple">
          <div
            class="select-multiple-wrap"
            ref="selectMultipleRef"
            v-if="innerOptions?.length"
          >
            <div class="select-multiple">
              <div
                class="select-item"
                v-for="(item, index) in innerOptions"
                :key="index"
              >
                {{ item.Value }}
                <img
                  :src="CloseIcon"
                  width="12"
                  height="12"
                  alt="Close"
                  class="cs-p"
                  @click="deleteItem(item.Id)"
                />
              </div>
            </div>
            <div class="select-item" v-if="hiddenOptionsCount">...</div>
          </div>
        </template>
      </VueMultiselect>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.ui-select-wrap {
  position: relative;
  .cs-p {
    cursor: pointer;
  }
  .ui-select-block {
    position: relative;
    .custom-expand {
      display: flex;
      align-items: center;
      column-gap: 12px;
      position: absolute;
      right: 12px;
      top: calc((100% - 24px) / 2);
      z-index: 10;
      background-color: $white;

      > div {
        height: 24px;
        width: 1px;
        background-color: $lightest-gray;
      }
    }

    .select-multiple-wrap {
      display: inline-flex;
      column-gap: 4px;
      width: 100%;
      .select-multiple {
        display: inline-flex;
        column-gap: 4px;
      }
      .select-item {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        column-gap: 8px;
        padding: 4px;
        border-radius: 4px;
        background: $red;
        color: $white;
        height: 24px;
      }
    }

    .multiselect {
      &.ui-select {
        .multiselect__tags {
          border-radius: 4px;
          border-color: $lightest-gray;
          padding-left: 12px;
          padding-right: 52px;
          padding-top: 7px;
          .multiselect__placeholder {
            padding-top: 4px;
            color: $gray;
          }

          .multiselect__input,
          .multiselect__single {
            padding: 2px 0 0 0;
            font-size: 14px;
            &::placeholder {
              color: $gray;
            }
          }

          .multiselect__single {
            color: $dark-gray;
          }
          .multiselect__tags-wrap {
            white-space: nowrap;
            .multiselect__tag {
            }
          }
        }

        .multiselect__content-wrapper {
          border-radius: 4px;
          border: 1px solid $lightest-gray;
          margin: 6px 0;
          .multiselect__content {
            .multiselect__option {
              display: flex;
              align-items: center;
              transition: all 0.1s ease-in;
              font-size: 14px;
              line-height: 24px;
              color: $light-gray;
              border-top: 1px solid $lightest-gray;
              height: 40px;

              &::after {
                content: "";
              }

              &:hover {
                background-color: $lightest-red;
                color: $white;
              }

              &--highlight {
                background-color: $white;
              }

              &--selected {
                background-color: $dark-red;
                color: $white;
                font-weight: 500;
              }
            }

            > li:first-child {
              .multiselect__option {
                border-top: none;
              }
            }
          }
        }
      }
    }

    &.gray {
      .multiselect__tags {
        background-color: $superlight-gray;
        border-color: $superlight-gray;

        input,
        .multiselect__input,
        .multiselect__single {
          background-color: $superlight-gray;
        }
      }

      .custom-expand {
        background-color: $superlight-gray;
      }
    }

    &.clearing {
      .multiselect__select {
        width: 75px;
      }

      .multiselect {
        &.ui-select {
          .multiselect__tags {
            padding-right: 68px;
          }
        }
      }
    }

    &.multiple {
      .multiselect {
        &.ui-select {
          .multiselect__tags {
            input {
              overflow: hidden;
              position: absolute;
              width: 0px !important;
              height: 0;
            }
          }
        }
      }
    }
  }
}
</style>