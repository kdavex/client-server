import loginController from "../controllers/loginController";
import { FastifyInstance } from "../types/fastify";

export function LoginRoute(
  instance: FastifyInstance,
  _option: any,
  done: () => void
) {
  instance.post("/", loginController.login);
  done();
}
