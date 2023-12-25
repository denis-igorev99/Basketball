import { ref } from "vue";
/**
 * * Упращение работы с загрузкой
 */
export function useLoading() {
  /**
   * * Идет ли загрузка
   */
  const isLoading = ref(false);
  /**
   * * Открыть
   */
  const startLoading = () => {
    isLoading.value = true;
  };
  /**
   * * Открыть
   */
  const stopLoading = () => {
    isLoading.value = false;
  };

  return { isLoading, startLoading, stopLoading };
}
