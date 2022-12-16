import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  private notificationsRepository: NotificationsRepository;
  constructor(notificationsRepository: NotificationsRepository) {
    this.notificationsRepository = notificationsRepository;
  }
  async execute(
    request: CountRecipientNotificationsRequest
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId
    );

    return { count };
  }
}
