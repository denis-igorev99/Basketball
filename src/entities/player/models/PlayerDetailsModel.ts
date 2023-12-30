import { PlayerModel } from "./PlayerModel";

/**
 * * Детальная модель игрока
 */
export class PlayerDetailsModel extends PlayerModel {
  /**
   * * Дата рождения
   */
  Birthday: Date = null;
  /**
   * * Загружаемый файл
   */
  Avatar?: File;
  constructor(player?: Partial<PlayerDetailsModel>) {
    super(player);
    if (player) Object.assign(this, player);
  }
}
