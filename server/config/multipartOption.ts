import { FastifyMultipartOptions } from "@fastify/multipart";

export const multipartOption: FastifyMultipartOptions = {
  limits: {
    fileSize: 1000000000, // 1gb
  },
};
