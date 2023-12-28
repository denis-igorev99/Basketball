/**
 * * Модель для компонента Select
 */
export class SelectItemModel {
  /**
   * * Идентификатор
   */
  Id: number | string;
  /**
   * * Значение
   */
  Value: string;

  constructor(value?: Partial<SelectItemModel>) {
    if (value) Object.assign(this, value);
  }
}
