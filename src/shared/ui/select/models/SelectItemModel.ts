/**
 * * Модель для компонента Select
 */
export class SelectItemModel {
  /**
   * * Идентификатор
   */
  Id: number;
  /**
   * * Значение
   */
  Value: string;

  constructor(value?: Partial<SelectItemModel>) {
    if (value) Object.assign(this, value);
  }
}
