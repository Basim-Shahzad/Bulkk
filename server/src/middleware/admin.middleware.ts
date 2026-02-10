import { Request, Response, NextFunction } from "express";

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
   try {
      if (!req.user || req.user?.role !== "admin") {
         return res.status(401).json({
            success: false,
            message: "Not Authorized",
         });
      }

      next();
   } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
   }
};
