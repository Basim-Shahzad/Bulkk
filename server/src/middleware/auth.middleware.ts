import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req : Request, res: Response, next : NextFunction) => {
   const header = req.headers.authorization;
   if (!header?.startsWith("Bearer ")) throw new Error("Unauthorized");

   const token = header.split(" ")[1];
   const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

   req.user = decoded; // { userId, storeId, role }
   next();
};
