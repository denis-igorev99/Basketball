import { defineStore } from "pinia";
import { ref } from "vue";
/**
 * * Стор для работы с меню
 */
export const useMenuStore = defineStore("useMenuStore", () => {
  /**
   * * Показывать меню или скрывать
   */
  const drawer = ref<boolean>();

  /**
   * * Изменить состояние меню
   */
  const changeMenu = () => {
    drawer.value = !drawer.value;
  };

  return {
    /**
     * * Показывать меню или скрывать
     */
    drawer,
    /**
     * * Изменить состояние меню
     */
    changeMenu,
  };
});
