/**
 * * Модель описывающая ответ при пагинации
 */
export class PaginationResponseModel<T> {
    /**
     * * Успешное выполнение
     */
    IsSuccess:boolean = false;
    /**
     * * Всего элементов
     */
    Count: number;
    /**
     * * Элементы
     */
    Items: Array<T> = new Array<T>();
  
    constructor(obj?: Partial<PaginationResponseModel<T>>) {
      Object.assign(this, obj);
    }
  }
  