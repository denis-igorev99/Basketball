/**
 * * Модель игрока
 */
export class PlayerModel {
  Id: number;
  Name: string;
  AvatarUrl: string;
  Number: number;
  Team: string;

  constructor(player?: Partial<PlayerModel>) {
    if (player) Object.assign(this, player);
  }
}
