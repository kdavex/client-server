import { FastifyReply, FastifyRequest } from "fastify";
import { UserPostBody, UserPutBody } from "../controllers/usersController";
import { removeFiles } from "../utils/fileManager";

export async function usersPostOnResponseHandler(
  req: FastifyRequest<{ Body: UserPostBody }>,
  res: FastifyReply
) {
  // Remove Files From Temp Folder
  if (res.statusCode === 201) return;
  removeFiles([req.body.pfp, req.body.cover], "tmp");
}

export async function userPutOnResponseHandler(
  req: FastifyRequest<{ Body: UserPutBody }>,
  res: FastifyReply
) {
  // Remove Files From Temp Folder
  if (res.statusCode === 200) return;
  removeFiles([req.body.pfp, req.body.cover], "tmp");
}
