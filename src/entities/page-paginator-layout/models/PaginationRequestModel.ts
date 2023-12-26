/**
 * * Модель для описания запроса при пагинации
 */
export class PaginationRequestModel {
  /**
   * * Кол-во записей
   */
  Size: number = 6;
  /**
   * * Текущая страница
   */
  CurrentPage: number = 1;

  constructor(obj?: Partial<PaginationRequestModel>) {
    if (obj) Object.assign(this, obj);
  }
}
