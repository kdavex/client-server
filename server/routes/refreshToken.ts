import refrehTokenController from "../controllers/refreshToken";
import { FastifyInstance } from "../types/fastify";

export function RefreshTokenRoute(
  instance: FastifyInstance,
  _options: any,
  done: () => void
) {
  instance.post("/", refrehTokenController.refreshToken);
  done();
}
