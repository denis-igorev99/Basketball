import { defineStore } from "pinia";
import { ref } from "vue";
import { NotificationModel } from "../models";
import { NotificationType } from "../enums";

/**
 * * Стор для работы с уведомлениями
 */
export const useNotificationStore = defineStore("notification-store", () => {
  /**
   * * Уведомления
   */
  const notifications = ref<NotificationModel[]>([]);

  /**
   * * Информативное уведомление
   * @param text Текст уведомления
   */
  const success = (text: string) => {
    addNotification(text, NotificationType.Info);
  };

  /**
   * * Уведомление об ошибке
   * @param text Текст уведомления
   */
  const error = (text: string) => {
    addNotification(text, NotificationType.Error);
  };

  /**
   * * Добавить уведомление
   * @param text Текст
   * @param type Тип
   */
  const addNotification = (text: string, type: NotificationType) => {
    const totification = new NotificationModel({
      Text: text,
      Type: type,
    });

    notifications.value.unshift(totification);

    setTimeout(() => {
      const index = notifications.value.findIndex(
        (x) => x.Id == totification.Id
      );
      if (index !== -1) {
        notifications.value.splice(index, 1);
      }
    }, 5000);
  };

  return {
    /**
     * * Уведомления
     */
    notifications,
    /**
     * * Информативное уведомление
     * @param text Текст уведомления
     */
    success,
    /**
     * * Уведомление об ошибке
     * @param text Текст уведомления
     */
    error,
  };
});
