import { config } from "dotenv";
import { SignOptions } from "jsonwebtoken";

config({ path: ".env" });

export const PORT = process.env.PORT as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const DB_URI = process.env.DB_URI as string;

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
