import { NotificationType } from "../enums";

/**
 * * Модель уведомления
 */
export class NotificationModel {
  /**
   * * Идентификатор 
   */
  Id: number = new Date().getTime();
  /**
   * * Текст
   */
  Text: string;
  /**
   * * Тип уведомления
   */
  Type!: NotificationType;

  constructor(notification?: Partial<NotificationModel>) {
    if (notification) Object.assign(this, notification);
  }
}
