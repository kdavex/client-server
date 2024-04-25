import { FastifyInstance } from "../types/fastify";

import { notificationController } from "../controllers/notificationController";
import { authorize } from "../middlewares/authorize";

export function NotificationRoute(
  fastify: FastifyInstance,
  _options: any,
  done: () => void,
) {
  fastify.get(
    "/",
    { preValidation: [authorize("USER")] },
    notificationController.getNotifications,
  );
  done();
}
