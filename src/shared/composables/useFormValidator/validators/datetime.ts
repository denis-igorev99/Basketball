import { ValidatorModel } from "../models";

/**
 * * Валидатор года
 * @param errorMessage Сообщение об ошибке
 * @returns
 */
export const checkYear = (errorMessage?: string) => {
  const regex = /^(10|20)\d{2}$/;

  return new ValidatorModel<string | number>({
    GetErrorMessage: () =>
      "The year format is entered incorrectly" || errorMessage,
    ValidationFn: (value) => regex.test(value + ""),
  });
};

/**
 * * Валидатор года, который проверит, что бы заполненный год был не больше текущего
 * @param errorMessage Сообщение об ошибке
 * @returns
 */
export const checkNoMoreCurrentYear = (errorMessage: string) => {
  return new ValidatorModel<string | number>({
    GetErrorMessage: () => errorMessage,
    ValidationFn: (value) => Number(value) <= new Date().getFullYear(),
  });
};
