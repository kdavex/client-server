"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const converseController_ts_1 = require("../controllers/converseController.ts");
const authorize_ts_1 = require("../middlewares/authorize.ts");
const multipartConsumer_ts_1 = require("../middlewares/multipartConsumer.ts");
function ConverseRoute(instance, option, done) {
    instance.post("/sendMessage", { preValidation: [(0, authorize_ts_1.authorize)("USER"), multipartConsumer_ts_1.arbitraryMultipartConsumer] }, converseController_ts_1.converseController.sendMessage);
    instance.get("/search", { preValidation: [(0, authorize_ts_1.authorize)("USER")] }, converseController_ts_1.converseController.searchConversation);
    instance.get("/", { preValidation: [(0, authorize_ts_1.authorize)("USER")] }, converseController_ts_1.converseController.getConverse);
    instance.get("/list", { preValidation: [(0, authorize_ts_1.authorize)("USER")] }, converseController_ts_1.converseController.getConverseList);
    instance.get("/recipient", { preValidation: [(0, authorize_ts_1.authorize)("USER")] }, converseController_ts_1.converseController.getRecipient);
    instance.get("/media", { preValidation: [(0, authorize_ts_1.authorize)("USER")] }, converseController_ts_1.converseController.getConverseMedia);
    done();
}
exports.default = ConverseRoute;
