import jwt from "jsonwebtoken";

export const signAccessToken = (payload: object) => {
   const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
   if (!JWT_ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET missing");

   return jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
   });
};

export const signRefreshToken = (payload: object) => {
   const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
   if (!JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET missing");

   return jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
   });
};
