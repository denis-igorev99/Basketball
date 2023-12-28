<script lang="ts" setup>
import { usePlayerStore, useTeamStore } from "@/entities";
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
  (e: "update:modelValue", value: number): void;
}>();

/**
 * * Значение
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value as number);
  },
});

/**
 * * Стор для работы с командой
 */
const { teams } = storeToRefs(useTeamStore());
const { getTeamsForSelect } = useTeamStore();

/**
 * * Список позиций
 */
const innerPositions = computed(() =>
  teams.value?.map(
    (x) =>
      new SelectItemModel({
        Id: x.Id,
        Value: x.Name,
      })
  )
);

onMounted(async () => {
  if (!teams.value?.length) await getTeamsForSelect();
});
</script>

<template>
  <Select v-model="value" v-bind="props" :options="innerPositions" is-clear />
</template>

<style lang="scss" scoped></style>
