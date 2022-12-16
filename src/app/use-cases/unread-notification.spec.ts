import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { UnreadNotification } from "./unread-notification";

describe("unread notification", () => {
  it("should be able to unread a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    const readNotification = new UnreadNotification(notificationsRepository);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });
  it("should not  be able to unread a notification when it does not exist", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new UnreadNotification(notificationsRepository);
    expect(() => {
      return readNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
