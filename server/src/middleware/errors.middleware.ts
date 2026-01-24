import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
   statusCode?: number;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
   let error: CustomError = err;

   console.error(err);

   // Mongoose bad ObjectId
   if (err.name === "CastError") {
      error = new Error("Resource not found") as CustomError;
      error.statusCode = 404;
   }

   res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
   });
};

export default errorMiddleware;
