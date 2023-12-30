import { TeamModel } from "./TeamModel";

/**
 * * Детальная модель команды
 */
export class TeamDetailsModel extends TeamModel {
  /**
   * * Картинка
   */
  Image?: File;
  constructor(team?: Partial<TeamDetailsModel>) {
    super(team);
    if (team) Object.assign(this, team);
  }
}
