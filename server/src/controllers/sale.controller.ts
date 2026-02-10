import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Sale } from "../models/sale.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

interface CustomError extends Error {
   statusCode?: number;
}

const SaleItemSchema = z.object({
   product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Product ID format",
   }),
   quantity: z.number().int().positive("Quantity must be at least 1"),
   unitPrice: z.number().nonnegative("Unit price cannot be negative"),
});

const CreateSaleSchema = z.object({
   customer: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
         message: "Invalid Customer ID format",
      })
      .optional(),
   store: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Store ID format",
   }),
   items: z.array(SaleItemSchema).min(1, "At least one item is required"),
   // soldBy: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
   //    message: "Invalid User ID format",
   // }),
   soldBy: z.string()
});

type SaleType = z.infer<typeof CreateSaleSchema>;

export async function createSale(req: Request, res: Response, next: NextFunction) {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const validatedData = CreateSaleSchema.parse(req.body);

      for (const item of validatedData.items) {
         const product = await Product.findById(item.product).session(session);

         if (!product) {
            throw new Error(`Product not found: ${item.product}`);
         }

         if (product.quantity < item.quantity) {
            await session.abortTransaction();
            session.endSession();

            return res.status(409).json({
               success: false,
               message: `Insufficient stock for ${product.name}`,
            });
         }

         product.quantity -= item.quantity;
         await product.save({ session });
      }

      // Note: totalAmount is handled by the pre-save hook in model
      const [newSale] = await Sale.create([validatedData], { session });

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
         success: true,
         sale: newSale
      });
   } catch (error: any) {
      if (session.inTransaction()) {
         await session.abortTransaction();
      }
      session.endSession();

      if (error instanceof z.ZodError) {
         return res.status(400).json({ success: false, errors: error.message });
      }

      next(error);
   }
}

export async function getSales(req: Request, res: Response, next: NextFunction) {
   try {
      const storeId = req.user?.storeId;

      if (!storeId) {
         const err: CustomError = new Error("Not authorized - No store linked to user");
         err.statusCode = 401;
         return next(err);
      }

      const sales = await Sale.find({ store: storeId });

      res.status(200).json({
         success: true,
         salesCount: sales.length,
         sales: sales,
      });
   } catch (error) {
      next(error);
   }
}

export async function getSaleById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const sale: SaleType | null = await Sale.findById(id);

      if (!sale) {
         const error: any = new Error("Sale not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(200).json({
         success: true,
         sale: sale,
      });

   } catch (error) {
      next(error);
   }
}
