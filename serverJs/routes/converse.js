import { converseController } from "../controllers/converseController.ts";
import { authorize } from "../middlewares/authorize.ts";
import { arbitraryMultipartConsumer } from "../middlewares/multipartConsumer.ts";
export default function ConverseRoute(instance, option, done) {
    instance.post("/sendMessage", { preValidation: [authorize("USER"), arbitraryMultipartConsumer] }, converseController.sendMessage);
    instance.get("/search", { preValidation: [authorize("USER")] }, converseController.searchConversation);
    instance.get("/", { preValidation: [authorize("USER")] }, converseController.getConverse);
    instance.get("/list", { preValidation: [authorize("USER")] }, converseController.getConverseList);
    instance.get("/recipient", { preValidation: [authorize("USER")] }, converseController.getRecipient);
    instance.get("/media", { preValidation: [authorize("USER")] }, converseController.getConverseMedia);
    done();
}
