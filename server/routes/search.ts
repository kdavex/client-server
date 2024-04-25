import { FastifyInstance } from "fastify/types/instance";
import { searchController } from "../controllers/searchController";

export function SearchRoute(
  fastify: FastifyInstance,
  _options: any,
  done: () => void
) {
  fastify.get("/:search", {}, searchController.search);
  done();
}

