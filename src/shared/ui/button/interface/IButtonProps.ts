import { ButtonHTMLAttributes } from "vue";

/**
 * * Интерфейс входных параметров Button
 */
export interface IButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  /**
   * * Иконка справа
   */
  iconRight?: string;
  /**
   * * Цвет кнопки
   */
  buttonColor: "primary" | "default";
}
