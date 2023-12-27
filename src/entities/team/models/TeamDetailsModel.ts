/**
 * * Детальная модель команды
 */
export class TeamDetailsModel {
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
    constructor(team?: Partial<TeamDetailsModel>) {
      if (team) Object.assign(this, team);
    }
  }
  