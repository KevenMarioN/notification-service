import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe("Send notification", () => {
  it("should be able to send a notification", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: "social",
      content: "Você recebeu uma curtida!",
      recipientId: "test-use-case",
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notification).toStrictEqual(
      notificationsRepository.notifications[0]
    );
  });
});
