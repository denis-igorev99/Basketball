/**
 * * Модель команды
 */
export class TeamModel {
  Id: number;
  Name: string;
  ImageUrl: string;
  Conference: string;
  Division: string;
  FoundationYear: number;
  constructor(team?: Partial<TeamModel>) {
    if (team) Object.assign(this, team);
  }
}
