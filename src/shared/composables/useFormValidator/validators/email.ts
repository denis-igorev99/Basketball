import { ValidatorModel } from "../models";

/**
 * * Валидатор email
 * @param errorMessage Сообщение об ошибке
 * @returns
 */
export const email = (errorMessage: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  return new ValidatorModel<string>({
    GetErrorMessage: () => errorMessage,
    ValidationFn: (value) => regex.test(value),
  });
};
