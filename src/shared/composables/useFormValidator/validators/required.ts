import { ValidatorModel } from "../models";

/**
 * * Валидатор обязательного значения
 * @param errorMessage Сообщение об ошибке
 * @returns
 */
export const required = <T extends number | undefined | string | boolean | object>(errorMessage: string) =>
  new ValidatorModel<T>({
    GetErrorMessage: () => errorMessage,
    ValidationFn: (value) => {
      switch (typeof value) {
        case "string":
          return !!value.trim();
        default:
          return !!value;
      }
    },
  });
