/**
 * * Модель регистрации
 */
export class SignUpModel {
  /**
   * * Логин
   */
  Name: string;
  /**
   * * Логин
   */
  Login: string;
  /**
   * * Пароль
   */
  Password: string;

  constructor(loginData?: Partial<SignUpModel>) {
    if (loginData) Object.assign(this, loginData);
  }
}
