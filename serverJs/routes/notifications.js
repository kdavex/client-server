import { notificationController } from "../controllers/notificationController";
import { authorize } from "../middlewares/authorize";
export function NotificationRoute(fastify, _options, done) {
    fastify.get("/", { preValidation: [authorize("USER")] }, notificationController.getNotifications);
    done();
}
