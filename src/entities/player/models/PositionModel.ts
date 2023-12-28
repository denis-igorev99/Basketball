/**
 * * Модель игрока
 */
export class PositionModel {
  /**
   * * Идентификатор позиции
   */
  Id: string;
  /**
   * * Название позиции
   */
  Name: string;

  constructor(position?: Partial<PositionModel>) {
    if (position) Object.assign(this, position);
  }
}
