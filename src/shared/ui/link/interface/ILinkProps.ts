import { LinkHTMLAttributes } from "vue";

/**
 * * Интерфейс входных параметров Link
 */
export interface ILinkProps extends /* @vue-ignore */ LinkHTMLAttributes {
  /**
   * * Сделать компонент неактивным
   */
  disabled?: boolean;
  /**
   * * Название роута
   */
  routerName?: string;
  /**
   * * Query параметры 
   */
  queryParams?: Object;
  /**
   * * Параметры
   */
  params?: Object;
  /**
   * Добавить подчеркивание
   */
  isUnderline: boolean;
}
