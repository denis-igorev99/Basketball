import { ComputedRef, Ref, computed, ref } from "vue";
import { ValidatorModel } from "./models";

type ValidatorsType<T> = { [P in keyof T]: Array<ValidatorModel<T[P]>> };

export const useFormValidator = <T extends Record<string, any>>(fields: ComputedRef<T> | Ref<T>, validators: ValidatorsType<T>) => {
  /**
   * * Включена ли валидация
   */
  const isValidate = ref(false);

  /**
   * * Получить ошибки
   * @param fields
   * @param errorMessages
   * @returns
   */
  const GetErrors = (fields: T, validators: ValidatorsType<T>) => {
    /**
     * * Поля формы
     */
    const entries = Object.entries(fields);
    const errorsMsgs: { [P in keyof T]?: string } = {};

    for (let index = 0; index < entries.length; index++) {
      /**
       * * Ключ и значение поля формы
       */
      const key = entries[index][0] as keyof T;
      const value = entries[index][1];

      /**
       * * Валидаторы поля
       */
      const fieldValidators = validators[key];

      for (let index = 0; index < fieldValidators.length; index++) {
        const validator = fieldValidators[index];
        /**
         * * Проверяем значение на валидность
         */
        if (!validator.ValidationFn(value)) {
          errorsMsgs[key] = validator.GetErrorMessage(value);
          break;
        }
      }
    }

    return Object.keys(errorsMsgs).length ? errorsMsgs : undefined;
  };

  /**
   * * Проверка формы на валидность
   * @returns
   */
  const CheckIsValid = () => {
    return !GetErrors(fields.value, validators);
  };

  /**
   * * Ошибки
   */
  const errors = computed(() => {
    if (isValidate.value) {
      return GetErrors(fields.value, validators);
    }
  });
  /**
   * * Список ошибок в массиве
   */
  const errorsArray = computed(() => {
    if (errors.value) {
      return Object.values(errors.value).filter((msg) => !!msg) as Array<string>;
    }
  });
  /**
   * * Первая ошибка в списке
   */
  const firstError = computed(() => {
    if (errorsArray.value?.length) {
      return errorsArray.value[0];
    }
  });

  /**
   * * Валидна ли форма
   */
  const isValid = computed(() => !GetErrors(fields.value, validators));
  /**
   * * Октлючить кнопку отправки
   */
  const isDisabledSubmit = computed(() => isValidate.value && !isValid.value);

  /**
   * * Начать валидацию
   * @returns
   */
  const startValidate = () => {
    isValidate.value = true;
    return CheckIsValid();
  };

  /**
   * * Закончить валидацию
   */
  const stopValidate = () => {
    isValidate.value = false;
  };

  return {
    startValidate,
    stopValidate,
    isValidate,
    errors,
    errorsArray,
    firstError,
    isValid,
    isDisabledSubmit,
  };
};
