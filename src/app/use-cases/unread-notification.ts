import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  private notificationsRepository: NotificationsRepository;
  constructor(notificationsRepository: NotificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }
  async execute(
    request: UnreadNotificationRequest
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
