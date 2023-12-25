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
   * * Выделить красным цветом
   */
  isError?: boolean;
}
