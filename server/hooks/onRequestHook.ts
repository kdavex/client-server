import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "../types/fastify";

export function onRequestHook(
  req: FastifyRequest,
  _res: FastifyReply,
  done: () => void
) {
  // Decorators
  req.prisma = new PrismaClient();
  done();
}
