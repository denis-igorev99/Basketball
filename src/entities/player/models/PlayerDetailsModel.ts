/**
 * * Детальная модель игрока
 */
export class PlayerDetailsModel {
  /**
   * * Идентификатор
   */
  Id: number;
  /**
   * * Имя
   */
  Name: string;
  /**
   * * Аватарка
   */
  AvatarUrl: string;
  /**
   * * Номер
   */
  Number: number;
  /**
   * * Команда
   */
  Team: string;
  /**
   * * Позиция
   */
  Position: string;
  /**
   * * Рост
   */
  Height: number;
  /**
   * * Вес
   */
  Weight: number;
  /**
   * * Возраст
   */
  Age: number;
  /**
   * * Идентификатор команды
   */
  TeamId: number;
  /**
   * * Дата рождения
   */
  Birthday: Date = null;

  constructor(player?: Partial<PlayerDetailsModel>) {
    if (player) Object.assign(this, player);
  }
}
