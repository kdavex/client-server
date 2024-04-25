"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
require("@fastify/multipart");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const hooks_1 = require("./hooks");
const converse_1 = __importDefault(require("./routes/converse"));
const sockets_1 = require("./mongodb/sockets");
const notificationHandler_1 = require("./mongodb/sockets/notificationHandler");
// import { authorizeWS } from "./middlewares/authorize";
dotenv_1.default.config({
    path: node_path_1.default.resolve(import.meta.dirname, ".env"),
});
const app = (0, fastify_1.default)();
// ===== CORE PLUGINS ===== //
app.register(cors_1.default, config_1.corsOption);
app.register(multipart_1.default, config_1.multipartOption);
app.register(cookie_1.default, config_1.cookieOption);
app.register(static_1.default, config_1.statisCoption);
app.register(fastify_socket_io_1.default, config_1.socketIOOption);
// ======= Decorators ======== //
// ===== HOOKS ===== //
app.addHook("onError", (_req, _res, error, done) => {
    console.log(error);
    done();
});
app.addHook("preValidation", (req, _res, done) => {
    console.log({
        RuequestInfo: {
            path: req.url,
            isMultipart: req.isMultipart(),
            body: req.body,
            params: req.params,
            query: req.query,
            cookies: req.cookies,
        },
    });
    done();
});
app.addHook("onRequest", hooks_1.onRequestHook);
// ====== ROUTES ===== //
app.register(routes_1.UsersRoute, { prefix: "/users" });
app.register(routes_1.TestRoute);
app.register(routes_1.LoginRoute, { prefix: "/login" });
app.register(routes_1.LogoutRoute, { prefix: "/logout" });
app.register(routes_1.RefreshTokenRoute, { prefix: "/refresh_token" });
app.register(routes_1.PostsRoute, { prefix: "/posts" });
app.register(routes_1.CommentsRoute, { prefix: "/comments" });
app.register(routes_1.ProjectsRoute, { prefix: "/projects" });
app.register(routes_1.SearchRoute, { prefix: "/search" });
app.register(converse_1.default, { prefix: "/converse" });
app.register(routes_1.NotificationRoute, {
    prefix: "/notifications",
});
app.ready((err) => {
    if (err)
        throw err;
    app.io.on("connection", onConnection);
    // Change Stream Handlers
});
app.listen({
    port: parseInt(process.env.SERVER_PORT),
    host: process.env.SERVER_HOST,
}, (err, address) => {
    if (err)
        throw err;
    console.log(`Server listening at ${address}`);
});
//! Test
// ====== Sockets ===== //
const onConnection = (socket) => {
    socket.on("test", (message, cb) => {
        // const cookies = parse(socket.request.headers.cookie!);
        socket.emit("test", message);
        socket.broadcast.emit("test", message);
    });
    console.log("Socket Connected");
    (0, sockets_1.messageChangeHandler)(app.io, socket);
    (0, notificationHandler_1.NotificationChangeHandler)(app.io, socket);
};
app.get("/socket", (req, res) => {
    app.io.emit("secured", "This is a secured message");
    res.send({ status: "success" });
    app.io.emit("test", "Hello from server");
});
app.get("/cookie", (req, res) => {
    res.setCookie("hello", "world", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        partitioned: true,
    });
    return res.send({ status: "success", message: "cookie sent" });
});
