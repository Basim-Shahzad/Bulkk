import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
   try {
      const header = req.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;

      // Debugging check
      if (!decoded.storeId) {
         console.error("TOKEN ERROR: storeId missing from JWT payload", decoded);
      }

      req.user = {
         userId: decoded.userId || decoded.sub, // 'sub' is standard for IDs
         storeId: decoded.storeId?._id || decoded.storeId,
         role: decoded.role,
      };

      next();
   } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
   }
};
