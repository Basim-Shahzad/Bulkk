import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Customer } from "../models/customer.model";
import { Product } from "../models/product.model";
import { Sale } from "../models/sale.model";
import { User } from "../models/user.model";
import { Store } from "../models/store.model";

interface CustomError extends Error {
   statusCode?: number;
}

type TimeIntervalType = "yearly" | "monthly";

export async function getReports(req: Request, res: Response, next: NextFunction) {
   try {
      const storeId = req.user?.storeId;
      const { timeInterval } = req.query as { timeInterval: "yearly" | "monthly" };
      const now = new Date();
      let startDate: Date;
      let format: string;

      if (timeInterval === "yearly") {
         startDate = new Date(now.getFullYear(), 0, 1);
         format = "%m"; // Month: 01-12
      } else {
         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
         format = "%d"; // Day: 01-31
      }

      const report = await Sale.aggregate([
         {
            $match: {
               store: new mongoose.Types.ObjectId(storeId as string),
               createdAt: { $gte: startDate },
            },
         },
         {
            $group: {
               _id: { $dateToString: { format: format, date: "$createdAt" } },
               total: { $sum: "$totalAmount" },
            },
         },
         { $sort: { _id: 1 } },
      ]);

      // **FIX: Pad single-digit IDs with leading zero**
      const paddedReport = report.map(item => ({
         ...item,
         _id: item._id.padStart(2, '0')
      }));

      console.log(paddedReport);

      res.status(200).json({ success: true, data: paddedReport });
   } catch (error) {
      next(error);
   }
}
