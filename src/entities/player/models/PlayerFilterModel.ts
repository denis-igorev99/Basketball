import { PaginationFilterModel } from "@/entities";

/**
 * * Модель фильтра для получения игроков
 */
export class PlayerFilterModel extends PaginationFilterModel {
  /**
   * * Идентификаторы команд
   */
  TeamIds?: number[] = [];

  constructor(filter?: Partial<PlayerFilterModel>) {
    super(filter);
    if (filter) Object.assign(this, filter);
  }
}
