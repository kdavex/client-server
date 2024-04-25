import { FastifyStaticOptions } from "@fastify/static";
import path from "node:path";
export const statisCoption: FastifyStaticOptions = {
  root: path.resolve(import.meta.dirname, "../public"),
  prefix: "/public/",
};
