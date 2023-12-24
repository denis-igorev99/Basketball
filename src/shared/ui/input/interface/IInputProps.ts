import { InputHTMLAttributes } from "vue";

/**
 * * Интерфейс входных параметров Input
 */
export interface IInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  /**
   * * Значение
   */
  modelValue?: any;
  /**
   * * Заголовок
   */
  inputLabel?: string;
  /**
   * * Ошибка
   */
  error?: string;
}
