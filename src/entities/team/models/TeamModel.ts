/**
 * * Модель команды
 */
export class TeamModel {
   /**
   * * Идентификатор
   */
   Id: number;
   /**
    * * Название
    */
   Name: string;
   /**
    * * Изображение
    */
   ImageUrl: string;
   /**
    * * Конференция
    */
   Conference: string;
   /**
    * * Разделение
    */
   Division: string;
   /**
    * * Год основания
    */
   FoundationYear: number;
  constructor(team?: Partial<TeamModel>) {
    if (team) Object.assign(this, team);
  }
}
