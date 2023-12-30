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

  /**
   * * Фильтр
   */
  const paginationFilter = ref(
    new PaginationFilterModel({ ...params.FilterData })
  );

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
      let response = await params.PaginationData.Search(paginationFilter.value);

      if (response.IsSuccess) {
        params.PaginationData.Items = response.Items;
        params.PaginationData.Count = response.Count;
      }
    } catch {}
  };

  /**
   * * Обновить фильтр
   * @param _filter Фильтр
   */
  const updateFilter = (_filter: PaginationFilterModel) => {
    paginationFilter.value = new PaginationFilterModel(_filter);
  };

  onMounted(() => {
    updateList();
  });

  return {
    /**
     * * Список
     */
    items,
    /**
     * * Кол-во элементов для отображения
     */
    count,
    /**
     * * Фильтр
     */
    paginationFilter,
    /**
     * * Обновить список
     */
    updateList,
    /**
     * * Обновить фильтр
     * @param _filter Фильтр
     */
    updateFilter,
  };
};
