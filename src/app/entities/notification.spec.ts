import { randomUUID } from "node:crypto";
import { Content } from "./content";
import { Notification } from "./notification";

describe(" content", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      category: "Social",
      content: new Content("Você recebeu uma solicitação de amizade!"),
      recipientId: randomUUID(),
    });
    expect(notification).toBeTruthy();
  });
});
