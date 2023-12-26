/**
 * * Модель фильтра для получения игроков
 */
export class PlayerFilterModel {
  /**
   * * Идентификаторы команд
   */
  TeamIds?: number[];

  constructor(filter?: Partial<PlayerFilterModel>) {
    if (filter) Object.assign(this, filter);
  }
}
