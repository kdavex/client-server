import Fastify from "fastify";
import { readFileSync } from "fs";

console.log("nagana!");
const app = Fastify({
  logger: true,
});

app.get("/", async (req, res) => {
  try {
    const htmlContent = readFileSync("./index.html", "utf8");
    return res.status(200).type("text/html").send(htmlContent);
  } catch (error) {
    console.error("Error reading HTML file:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}
