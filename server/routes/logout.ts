import logoutController from "../controllers/logoutController";
import { FastifyInstance } from "../types/fastify";

export function LogoutRoute(
  instance: FastifyInstance,
  _option: any,
  done: () => void
) {
  instance.post("/", logoutController.logout);
  done();
}
