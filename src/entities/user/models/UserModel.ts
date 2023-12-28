/**
 * * Модель пользователя
 */
export class UserModel {
  /**
   * * Название
   */
  Name: string;
  /**
   * * Изображение
   */
  AvatarUrl: string;
  /**
   * * Токен
   */
  Token: string;
  constructor(user?: Partial<UserModel>) {
    if (user) Object.assign(this, user);
  }
}
