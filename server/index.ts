import Fastify from "fastify";
import { readFileSync } from "fs";

const app = Fastify({
  logger: true,
});

app.get("/", async (req, res) => {
  const htmlContent = readFileSync("./index.html", "utf8");

  return res.status(200).type("text/html").send(htmlContent);
});

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}
