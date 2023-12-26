import { computed, onMounted, ref } from "vue";
import { PaginationDataModel, PaginationFilterModel } from "../models";

/**
 * * Параметры для компосибла пагинации
 */
type UsePaginationListParams<PaginationFilterModel, TRes> = {
  /**
   * * Данные пагинатора
   */
  PaginationData?: PaginationDataModel<TRes>;
  /**
   * * Фильтр при инициализации
   */
  FilterData?: PaginationFilterModel;
};

/**
 * * Компосибл для пагинации списков с бесконечным скроллом инициализируемый в компоненте
 * Работает в связке с компосиблом usePaginationlistStore который инициализируется в сторе
 */
export const usePaginationList = <PaginationFilterModel, TRes>(
  _params: UsePaginationListParams<PaginationFilterModel, TRes>
) => {
  const params = {
    ..._params,
    FilterData: _params.FilterData,
  };
  console.log("params", params);

  /**
   * * Фильтр
   */
  const filter = ref(new PaginationFilterModel({ ...params.FilterData }));

  /**
   * * Поиск
   */
  const search = ref();

  /**
   * * Кол-во элементов для отображения
   */
  const count = computed(() => params.PaginationData.Count);

  /**
   * * Список
   */
  const items = computed(() => params.PaginationData.Items);

  /**
   * * Обновить список
   */
  const updateList = async () => {
    try {
      console.log("params.PaginationData", params.PaginationData);

      let response = await params.PaginationData.Search(filter.value);
      console.log("response", response);

      if (response.IsSuccess) {
        params.PaginationData.Items = response.Items;
        params.PaginationData.Count = response.Count;
      }
    } catch {}
  };

  onMounted(() => {
    updateList();
    console.log("update list");
  });

  return {
    /**
     * * Фильтр
     */
    filter,
    /**
     * * Список
     */
    items,
    /**
     * * Кол-во элементов для отображения
     */
    count,
    /**
     * * Обновить список
     */
    updateList,
  };
};
