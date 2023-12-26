<script lang="ts" setup>
import { computed, onMounted, onUnmounted, PropType, ref } from "vue";
import { PaginationDataModel, PaginationFilterModel } from "../models";
import { Button, Search, Pagination, SelectItemModel } from "@/shared";
import { PaginationSizeSelect, usePaginationList } from "@/entities";
import PlusIcon from "@/shared/assets/img/icons/plus.svg";
const props = defineProps({
  /**
   * * Данные для управления получением учеников
   */
  paginator: {
    type: Object as PropType<PaginationDataModel<T>>,
    default: () => new PaginationDataModel(),
  },
  /**
   * * Данные фильтра
   */
  filter: {
    type: Object as PropType<PaginationFilterModel>,
    default: () => new PaginationFilterModel(),
  },
});

const emit = defineEmits<{
  /**
   * * Добавить сущность
   */
  (e: "click:add"): void;
  /**
   * * Обновление значения
   */
  (e: "update:filter", value: PaginationFilterModel): void;
}>();

const innerFilter = ref<PaginationFilterModel>(props.filter);

/**
 * * Ширина экрана
 */
const width = ref(window.innerWidth);

/**
 * * Кол-во показываемых значений в пагинации
 */
const showCount = computed(() => (width.value < 1024 ? 3 : 4));

/**
 * * Управление листом пагинации
 */
const { items, count, updateList } = usePaginationList({
  PaginationData: props.paginator,
});

/**
 * * Обновить ширину экрана
 */
const updateWidth = () => {
  width.value = window.innerWidth;
};

/**
 * * Установить значение фильтра
 * @param key Ключ
 * @param value Значение
 */
const setValue = (key: keyof PaginationFilterModel, value: any) => {
  emit(
    "update:filter",
    new PaginationFilterModel({
      ...props.filter,
      [key]: value,
    })
  );

  updateList();
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div class="page-paginator-layout">
    <div class="page-filter">
      <div class="pag-filter-search">
        <Search
          :model-value="filter.Search"
          @update:modelValue="setValue('Search', $event)"
          placeholder="Search..."
        />
        <slot name="right-search" />
      </div>
      <div class="add-entity">
        <Button :iconRight="PlusIcon" @click="emit('click:add')">Add</Button>
      </div>
    </div>
    <div class="page-content">
      <div class="page-list" v-if="count">
        <slot
          v-for="(item, index) in items"
          :key="index"
          name="entity"
          :item="item"
        />
      </div>
      <slot v-else name="empty-search" />
    </div>
    <div class="page-pagination">
      <Pagination
        :page="filter.CurrentPage"
        :size="filter.Size"
        :count="paginator?.Count"
        :showCount="showCount"
        @update:page="setValue('CurrentPage', $event)"
      />
      <PaginationSizeSelect
        :model-value="filter.Size"
        @update:modelValue="setValue('Size', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.page-paginator-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 16px;
  column-gap: 32px;

  .page-filter {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    @include media("<desktop") {
      .add-entity {
        > button {
          width: 100%;
        }
      }
    }
  }

  .page-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .page-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      @include media(">desktop") {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 24px;
      }
    }
  }

  .page-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @include media(">desktop") {
    .page-filter {
      flex-direction: row;
      justify-content: space-between;
      .pag-filter-search {
        > div {
          min-width: 364px;
        }
      }
    }
  }
}
</style>
