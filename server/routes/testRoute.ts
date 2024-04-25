import { FastifyInstance, FastifyRequest } from "../types/fastify";
import {
  arbitraryMultipartConsumer,
  multipartConsumer,
} from "../middlewares/multipartConsumer";
import { moveFile } from "../utils/fileManager";

export function TestRoute(
  instance: FastifyInstance,
  _options: any,
  done: () => void,
) {
  instance.post(
    "/test",
    { preHandler: arbitraryMultipartConsumer },
    async (req: FastifyRequest<{ Body: Record<string, any> }>, res) => {
      moveFile(req.body.media, "tmp", "public");
      return res.send({ message: "success", body: { ...req.body } });
    },
  );
  done();
}
