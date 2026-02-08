import { Request } from "express";

declare global {
   namespace Express {
      interface Request {
         user?: {
            userId: string | mongoose.Types.ObjectId;
            storeId: string | mongoose.Types.ObjectId;
            role: string;
         };
      }
   }
}
