import { SelectItemModel } from "../models";

/**
 * * Интерфейс для работы с Select
 */
export interface ISelectProps {
  /**
   * * Значение
   */
  modelValue: number | string | number[];
  /**
   * * Множественный выбор
   */
  multiple: boolean;
  /**
   * * Опции
   */
  options: SelectItemModel[];
  /**
   * * Заголовок
   */
  selectLabel: string;
  /**
   * * Возможность очистить значение
   */
  isClear: boolean;
  /**
   * * Ошибка
   */
  error?: string;
  /**
   * * Цвет
   */
  selectColor: "gray" | "white";
}
