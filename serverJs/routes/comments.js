import commentController, { test } from "../controllers/commentController.ts";
import { authorize } from "../middlewares/authorize.ts";
export function CommentsRoute(instance, _option, done) {
    instance.get("/", { preValidation: [authorize("ANY")] }, commentController.getComments);
    instance.get("/:commentId", { preValidation: [authorize("ANY")] }, commentController.getComment);
    instance.post("/", { preValidation: [authorize("ANY")] }, commentController.createComment);
    instance.put("/", { preValidation: [authorize("ANY")] }, commentController.updateComment);
    instance.patch("/upVoteToggle", { preValidation: [authorize("ANY")] }, commentController.upVoteToggle);
    instance.patch("/downVoteToggle", { preValidation: [authorize("ANY")] }, commentController.downVoteToggle);
    instance.delete("/", { preValidation: [authorize("ANY")] }, commentController.deleteComment);
    instance.post("/reply", { preValidation: [authorize("ANY")] }, commentController.replyComment);
    instance.post("/test", test);
    done();
}
