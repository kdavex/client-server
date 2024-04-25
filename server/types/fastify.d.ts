import { PrismaClient, Role, User } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server } from "socket.io";
// Add decorators
declare module "fastify" {
  export interface FastifyInstance {
    prisma: PrismaClient;
    io: Server;
  }

  export interface FastifyRequest {
    prisma: PrismaClient;
    userId: string;
    role: Role;
  }
  export interface FastifyReply {}
}

export { FastifyInstance, FastifyRequest, FastifyReply };
