import { FastifyRequest, FastifyReply } from "../types/fastify";

const logout = async (_req: FastifyRequest, res: FastifyReply) => {
  res.clearCookie("refreshToken", {
    path: "/refresh_token",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.send({ status: "success", message: "Logout success" });
};

const logoutController = { logout };
export default logoutController;
