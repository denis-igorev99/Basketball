import { PaginationRequestModel } from "./PaginationRequestModel";

/**
 * * Модель для поиска
 */
export class PaginationFilterModel extends PaginationRequestModel {
  /**
   * * Кол-во записей
   */
  Search?: string;

  constructor(filter?: Partial<PaginationFilterModel>) {
    super(filter);
    if (filter) Object.assign(this, filter);
  }
}
