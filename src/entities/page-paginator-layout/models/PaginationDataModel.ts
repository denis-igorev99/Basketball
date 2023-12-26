import { PaginationRequestModel } from "./PaginationRequestModel";
import { PaginationResponseModel } from "./PaginationResponseModel";

/**
 * * Модель пагинации
 */
export class PaginationDataModel<T> {
  /**
   * * Список
   */
  Items: T[] = [];
  /**
   * * Общее кол-во отображаемых элементов
   */
  Count: number = 0;

  /**
   * * Поиск
   */
  Search: (
    pageRequest?: PaginationRequestModel,
    isUpdate?: boolean
  ) => Promise<PaginationResponseModel<T>>;

  constructor(obj?: Partial<PaginationDataModel<T>>) {
    if (obj) Object.assign(this, obj);
  }
}
