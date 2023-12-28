/**
 * * Модель ответа от сервера
 */
export class ResponseModel<T> {
  /**
   * * Статус запроса
   */
  IsSuccess: boolean = false;
  /**
   * * Ошибка
   */
  ErrorMessage?: string;
  /**
   * * Значение
   */
  Value: T;

  constructor(response?: Partial<ResponseModel<T>>) {
    if (response) Object.assign(this, response);
  }
}
