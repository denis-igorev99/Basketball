/**
 * * Модель описывающая ответ при пагинации
 */
export class PaginationResponseModel<T> {
  /**
   * * Успешное выполнение
   */
  IsSuccess: boolean = false;
  /**
   * * Всего элементов
   */
  Count: number;
  /**
   * * Элементы
   */
  Items: Array<T> = new Array<T>();

  constructor(data?: Partial<PaginationResponseModel<T>>) {
    if (data) Object.assign(this, data);
  }
}
