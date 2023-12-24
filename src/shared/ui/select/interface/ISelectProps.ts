import { SelectItemModel } from "../models";

/**
 * * Интерфейс для работы с Select
 */
export interface ISelectProps {
  modelValue: number | number[];
  multiple: boolean;
  options: SelectItemModel[];
}
