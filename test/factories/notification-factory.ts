import { Content } from "@app/entities/content";
import { Notification, NotificationProps } from "@app/entities/notification";

type override = Partial<NotificationProps>;

export function makeNotification(override: override = {}) {
  return new Notification({
    category: "social",
    content: new Content("Você recebeu uma curtida!"),
    recipientId: "recipient-1",
    ...override,
  });
}
