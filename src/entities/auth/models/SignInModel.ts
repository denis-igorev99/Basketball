/**
 * * Модель авторизации
 */
export class SignInModel {
  /**
   * * Логин
   */
  Login: string;
  /**
   * * Пароль
   */
  Password: string;
  
  constructor(loginData?: Partial<SignInModel>) {
    if (loginData) Object.assign(this, loginData);
  }
}
