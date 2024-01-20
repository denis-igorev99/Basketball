/**
 * * Модель хдебной крошки
 */
export class BreadCrumbsModel {
  /**
   * * Текст
   */
  Text!: string;
  /**
   * * Маршрут
   */
  Route?: string;
  /**
   * * Параметры
   */
  QueryParams?: Object;

  constructor(player?: Partial<BreadCrumbsModel>) {
    if (player) Object.assign(this, player);
  }
}
