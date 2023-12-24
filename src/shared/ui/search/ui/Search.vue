<script lang="ts" setup>
import { Input } from "@/shared";
import { computed, PropType, ref } from "vue";
import { ISearchProps } from "@/shared/ui/search/interface";
import SearchImg from "@/shared/assets/img/icons/search.svg";

const props = withDefaults(defineProps<ISearchProps>(), {
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
 * * Идентификатор таймера
 */
const timeoutId = ref<number | null>(null);

/**
 * * Значение
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
      emit("update:modelValue", value);
    }, 1000);
  },
});
</script>

<template>
  <div class="ui-search-wrapper">
    <Input class="custom-input" v-model="value" v-bind="$attrs" />
    <img :src="SearchImg" alt="Search" width="16" height="16" />
  </div>
</template>

<style lang="scss" scoped>
.ui-search-wrapper {
  position: relative;
  > img {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }

  .ui-input-wrap .ui-input {
    padding-right: 24px;
  }
}
</style>

<style lang="scss">
.ui-search-wrapper {
  .ui-input-wrap {
    &.custom-input {
      .ui-input {
        padding-right: 40px;
        background: $white;
      }
    }
  }
}
</style>
