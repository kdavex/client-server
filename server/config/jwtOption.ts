import { SignOptions } from "jsonwebtoken";

export const accessTokenOption: SignOptions = {
  expiresIn: "1d",
};

export const refreshTokenOptions: SignOptions = {
  expiresIn: "7d",
};
