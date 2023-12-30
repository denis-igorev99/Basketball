import { defineStore } from "pinia";
import { UserModel } from "../models";
import { computed, ref } from "vue";
import { ResponseModel, SignInModel, SignUpModel } from "@/entities";
import { noAuthApi } from "@/shared";

/**
 * * Стор для работы с пользователем
 */
export const useUserStore = defineStore("user-store", () => {
  /**
   * * Пользователь
   */
  const user = ref<UserModel>(new UserModel());

  /**
   * * Пользователь авторизован
   */
  const isAuthorized = computed(() => !!user.value.Token);

  /**
   * * Авторизация
   * @returns Пользователь
   */
  const signIn = async (data: SignInModel) =>
    new Promise<ResponseModel<UserModel>>(async (resolve) => {
      await noAuthApi
        .post("/api/Auth/SignIn", {
          login: data.Login,
          password: data.Password,
        })
        .then(({ data }) => {
          setUser(
            new UserModel({
              Name: data.name,
              AvatarUrl: data.avatarUrl,
              Token: data.token,
            })
          );
          return resolve(
            new ResponseModel<UserModel>({ IsSuccess: true, Value: user.value })
          );
        })
        .catch(() =>
          resolve(new ResponseModel<UserModel>({ IsSuccess: false }))
        );
    });

  /**
   * * Регистрация
   * @returns Пользователь
   */
  const signUp = async (data: SignUpModel) =>
    new Promise<ResponseModel<UserModel>>(async (resolve) => {
      await noAuthApi
        .post("/api/Auth/SignUp", {
          login: data.Login,
          password: data.Password,
          userName: data.Name,
        })
        .then(({ data }) => {
          setUser(
            new UserModel({
              Name: data.name,
              AvatarUrl: data.avatarUrl,
              Token: data.token,
            })
          );
          return resolve(
            new ResponseModel<UserModel>({ IsSuccess: true, Value: user.value })
          );
        })
        .catch(() =>
          resolve(new ResponseModel<UserModel>({ IsSuccess: false }))
        );

      return resolve(new ResponseModel<UserModel>({ IsSuccess: true }));
    });

  /**
   * * Получить пользователя
   */
  const getUser = () => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      user.value = new UserModel(JSON.parse(userInfo));
    }
  };

  /**
   * * Добавить пользователя
   * @param _user Пользователь
   */
  const setUser = (_user: UserModel) => {
    user.value = new UserModel(_user);
    localStorage.setItem("user", JSON.stringify(user.value));
  };

  /**
   * * Выйти из аккаунта
   */
  const logout = () => {
    localStorage.removeItem("user");
    user.value = new UserModel();
  };

  return {
    /**
     * * Пользователь
     */
    user,
    /**
     * * Пользователь авторизован
     */
    isAuthorized,
    /**
     * * Авторизация
     * @returns Пользователь
     */
    signIn,
    /**
     * * Регистрация
     * @returns Пользователь
     */
    signUp,
    /**
     * * Выйти из аккаунта
     */
    logout,
    /**
     * * Получить пользователя
     */
    getUser,
  };
});
