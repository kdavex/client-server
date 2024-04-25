import { arbitraryMultipartConsumer, } from "../middlewares/multipartConsumer";
import { moveFile } from "../utils/fileManager";
export function TestRoute(instance, _options, done) {
    instance.post("/test", { preHandler: arbitraryMultipartConsumer }, async (req, res) => {
        moveFile(req.body.media, "tmp", "public");
        return res.send({ message: "success", body: { ...req.body } });
    });
    done();
}
