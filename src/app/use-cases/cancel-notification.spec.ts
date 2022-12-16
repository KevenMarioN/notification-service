import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

describe("Cancel notification", () => {
  it("should be able to cancel a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    const cancelNotification = new CancelNotification(notificationsRepository);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });
  it("should not  be able to cancel a notification when it does not exist", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
