import { ValidatorModel } from "../models";

/**
 * * Валидатор минимальной длинны строки
 * @param minLength Минимальная длина строки
 * @param errorMessage Сообщение об ошибке
 * @returns
 */
export const minLength = (minLength: number, errorMessage: string | ((length: number) => string)) =>
  new ValidatorModel<string | undefined>({
    GetErrorMessage: (value) => {
      return typeof errorMessage === "function" ? errorMessage((value || "").toString().trim().length) : errorMessage;
    },
    ValidationFn: (value) => {
      return !!value && value.toString()?.trim()?.length >= minLength;
    },
  });
