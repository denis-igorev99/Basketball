/**
 * * Интерфейс входных параметров Checkbox
 */
export interface ICheckboxProps {
  /**
   * * Значение
   */
  modelValue: boolean;
  /**
   * * Сделать компонент неактивным
   */
  disabled?: boolean;
  /**
   * * Ошибка
   */
  error?: string;
}
