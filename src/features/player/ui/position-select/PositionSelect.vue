<script lang="ts" setup>
import { usePlayerStore } from "@/entities";
import { ISelectProps, Select, SelectItemModel } from "@/shared";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

const props = withDefaults(defineProps<ISelectProps>(), {
  modelValue: null,
  selectColor: "gray",
  multiple: false,
  selectLabel: "",
  error: "",
  options: () => [],
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:modelValue", value: string): void;
}>();

/**
 * * Значение
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value as string);
  },
});

/**
 * * Стор для работы с игроками
 */
const { positions } = storeToRefs(usePlayerStore());
const { getPositions } = usePlayerStore();

/**
 * * Список позиций
 */
const innerPositions = computed(() =>
  positions.value?.map(
    (x) =>
      new SelectItemModel({
        Id: x.Id,
        Value: x.Name,
      })
  )
);

onMounted(async () => {
  if (!positions.value?.length) await getPositions();
});
</script>

<template>
  <Select v-model="value" v-bind="props" :options="innerPositions" is-clear />
</template>

<style lang="scss" scoped></style>
