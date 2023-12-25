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
  routerName?:string;
}
