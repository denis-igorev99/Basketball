<script lang="ts" setup>
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  useSlots,
  watch,
} from "vue";
import { PaginationDataModel, PaginationFilterModel } from "../models";
import { Button, Search, Pagination, SelectItemModel } from "@/shared";
import { PaginationSizeSelect, usePaginationList } from "@/entities";
import PlusIcon from "@/shared/assets/img/icons/plus.svg";
import { useRoute, useRouter } from "vue-router";
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
  /**
   * * Маршрут для добавления
   */
  createRouteName: {
    type: String,
  },
});

const emit = defineEmits<{
  /**
   * * Обновление значения
   */
  (e: "update:filter", value: PaginationFilterModel): void;
}>();

watch(
  () => props.filter,
  () => {
    if (JSON.stringify(props.filter) != JSON.stringify(paginationFilter.value)) {
      updateFilter(props.filter);
      updateList();
    }
  },
  { deep: true }
);

/**
 * * Маршруты
 */
const router = useRouter();
const route = useRoute();

const queryPage = computed(() => {
  return Number(route.query.page) ?? 1;
});

/**
 * * Настройка над слотом
 */
const slots = useSlots();

/**
 * * Заполнен ли слот
 */
const hasSlot = (name: string) => {
  return !!slots[name];
};

/**
 * * Фильтр
 */
const innerFilter = ref<PaginationFilterModel>(new PaginationFilterModel());
// console.log('innerFilter', innerFilter.value.CurrentPage);

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
const {
  items,
  count,
  paginationFilter,
  invalidPagination,
  updateList,
  updateFilter,
} = usePaginationList({
  PaginationData: props.paginator,
  FilterData: innerFilter.value,
});

watch(
  () => invalidPagination.value,
  (value: boolean) => {
    setValue("CurrentPage", 1);
  }
);

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
  const _filter = new PaginationFilterModel({
    ...props.filter,
    CurrentPage: 1,
    [key]: value,
  });

  emit("update:filter", _filter);

  let page = Number(route.query.page) ?? 1;

  if (page != _filter.CurrentPage)
    router.push({ name: route.name, query: { page: _filter.CurrentPage } });
};

/**
 * * Показывать слот для фильтра
 */
const isRightSearch = computed(
  () => hasSlot("right-search") || width.value > 1024
);

/**
 * * Перейти на создание
 */
const goToCreate = () => {
  if (props.createRouteName) router.push({ name: props.createRouteName });
};

/**
 * * Проверка, есть ли страница
 */
const checkPage = () => {
  let page = 1;
  if (route.query?.page) {
    if (!Number(route.query.page) || Number(route.query.page) < 1) {
      router.push({ name: route.name, query: { page: page } });
      updateList();
      return;
    }

    page = Number(route.query.page);

    if (page != innerFilter.value.CurrentPage) {
      setValue("CurrentPage", page);
    }
  }
};
checkPage();

onMounted(() => {
  window.addEventListener("resize", updateWidth);

  if (innerFilter.value.CurrentPage == queryPage.value) updateList();
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
          placeholder="Search..."
          @update:modelValue="setValue('Search', $event)"
        />
      </div>
      <div v-if="isRightSearch"><slot name="right-search" /></div>
      <div class="add-entity">
        <Button :iconRight="PlusIcon" @click="goToCreate">Add</Button>
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
    <div class="page-pagination" v-if="paginator?.Count">
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

  .page-filter {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 24px;
    @include media("<desktop") {
      display: flex;
      flex-direction: column;
      row-gap: 16px;

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
      @include media(">=desktop") {
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

  @include media("<desktop") {
    .page-filter,
    .page-list,
    .page-pagination {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

  @include media(">=desktop") {
    .page-filter {
      flex-direction: row;
      justify-content: space-between;

      .add-entity {
        display: flex;
        justify-content: flex-end;
      }
      .pag-filter-search {
        display: flex;
        column-gap: 24px;
        > div {
          width: 100%;
        }
      }
    }
  }
}
</style>
