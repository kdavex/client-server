import jwt from "jsonwebtoken";
import path from "node:path";
import dotenv from "dotenv";
import { accessTokenOption, refreshTokenOptions } from "../config/jwtOption.ts";
import "@fastify/cookie";
dotenv.config({
    path: path.resolve(import.meta.dirname, "../.env"),
});
export const createAccessToken = (userInfo) => {
    return jwt.sign(userInfo, process.env.ACCESS_TOKEN_KEY, accessTokenOption);
};
export const createRefreshToken = (userInfo) => {
    return jwt.sign(userInfo, process.env.REFRESH_TOKEN_KEY, refreshTokenOptions);
};
export const sendRefreshToken = (token, res) => {
    res.setCookie("refreshToken", token, {
        httpOnly: true,
        path: "/refresh_token",
        sameSite: "none",
        secure: true,
        partitioned: true,
    });
};
export const sendAccessToken = (userInfo, token, res) => {
    return res.send({ status: "success", accessToken: token, ...userInfo });
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
};
