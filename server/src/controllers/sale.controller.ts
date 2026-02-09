import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Sale } from "../models/sale.model";
import { Product } from "../models/product.model";

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
   soldBy: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid User ID format",
   }),
});

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
            throw new Error(`Insufficient stock for ${product.name}`);
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
         message: "Sale completed successfully",
         sale: newSale,
      });
   } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof z.ZodError) {
         return res.status(400).json({ success: false, errors: error.message });
      }

      next(error);
   }
}
