import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } from "../../config/env";

export const signAccessToken = (payload: object) => {
   if (!JWT_ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET missing");

   return jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
   });
};

export const signRefreshToken = (payload: object) => {
   if (!JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET missing");

   return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
   });
};
