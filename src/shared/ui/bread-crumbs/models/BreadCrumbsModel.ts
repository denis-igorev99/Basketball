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

  constructor(player?: Partial<BreadCrumbsModel>) {
    if (player) Object.assign(this, player);
  }
}

