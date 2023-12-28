import { defineStore } from "pinia";
import { UserModel } from "../models";
import { ref } from "vue";
import { ResponseModel, SignInModel, SignUpModel } from "@/entities";

/**
 * * Стор для работы с пользователем
 */
export const useUserStore = defineStore("user-store", () => {
  /**
   * * Пользователь
   */
  const user = ref<UserModel>(new UserModel());

  /**
   * * Авторизация
   * @returns Пользователь
   */
  const signIn = async (data: SignInModel) =>
    new Promise<ResponseModel<UserModel>>((resolve) => {
      user.value = new UserModel({
        Name: "Денис",
      });
      return resolve(new ResponseModel<UserModel>({ IsSuccess: true }));
    });

  /**
   * * Регистрация
   * @returns Пользователь
   */
  const signUp = async (data: SignUpModel) =>
    new Promise<ResponseModel<UserModel>>((resolve) => {
      user.value = new UserModel({
        Name: "Денис",
      });
      return resolve(new ResponseModel<UserModel>({ IsSuccess: true }));
    });

  /**
   * * Выйти из аккаунта
   */
  const logout = () => {
    console.log('sdfg')
  };

  return {
    /**
     * * Пользователь
     */
    user,
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
  };
});
