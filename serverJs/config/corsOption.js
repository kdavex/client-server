"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOption = void 0;
const dotenv_1 = require("dotenv");
const node_path_1 = __importDefault(require("node:path"));
(0, dotenv_1.config)({ path: node_path_1.default.resolve(import.meta.dirname, "../.env") });
exports.corsOption = {
    origin: [
        `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
        `https://localhost:${process.env.CLIENT_PORT}`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};
