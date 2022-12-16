import { Notification } from "@app/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  private notificationsRepository: NotificationsRepository;
  constructor(notificationsRepository: NotificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }
  async execute(
    request: GetRecipientNotificationsRequest
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.manyByRecipientId(
      recipientId
    );

    return { notifications };
  }
}
