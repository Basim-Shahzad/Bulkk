import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { success, z } from "zod";
import { Product } from "../models/product.model";
import { Store } from "../models/store.model";

interface CustomError extends Error {
   statusCode?: number;
}

const ProductSchema = z.object({
   name: z.string().min(1, "Name is required"),
   category: z.string().min(1, "Category is required"),
   price: z.number().positive("Price must be a positive number"),
   quantity: z.number().int().nonnegative().default(0),
   store: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Store ID format",
   }),
});

type ProductType = z.infer<typeof ProductSchema>;

export async function createProduct(req: Request, res: Response, next: NextFunction) {
   try {
      const result = ProductSchema.safeParse(req.body);

      if (!result.success) {
         const errorMsg = result.error.issues.map((issue) => issue.message).join(", ");
         const err: CustomError = new Error(errorMsg);
         err.statusCode = 400;
         return next(err);
      }

      const data: ProductType = result.data;

      // Later check if the store exists

      const newProduct = await Product.create({
         ...data,
         store: new mongoose.Types.ObjectId(data.store),
      });

      return res.status(201).json({
         success: true,
         product: newProduct,
      });
   } catch (error) {
      next(error);
   }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {
   try {
      const storeId = req.user?.storeId;

      if (!storeId) {
         const err: CustomError = new Error("Not authorized - No store linked to user");
         err.statusCode = 401;
         return next(err);
      }

      const products: ProductType[] = await Product.find({ store: storeId });

      res.status(200).json({
         success: true,
         productsCount: products.length,
         products: products,
      });
   } catch (error) {
      next(error);
   }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const product: ProductType | null = await Product.findById(id);

      if (!product) {
         const error: any = new Error("Product not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(200).json({
         success: true,
         product: product,
      });
   } catch (error) {
      next(error);
   }
}

export async function deleteProductById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const product: ProductType | null = await Product.findByIdAndDelete(id);

      if (!product) {
         const error: any = new Error("Product not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(204).json({
         success: true,
      });

   } catch (error) {
      next(error)
   }
}

export async function increaseProductStockById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      const { increase } = req.body

      const product: ProductType | null = await Product.findByIdAndUpdate(
         id,
         { $inc: { quantity: Number(increase) } },
         { new: true },
      );

      if (!product) {
         const error: any = new Error("Product not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(200).json({
         success: true,
         product: product,
      });
   } catch (error) {
      next(error);
   }
}

export async function decreaseProductStockById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;
      const { decrease } = req.body

      const product: ProductType | null = await Product.findByIdAndUpdate(
         id,
         { $inc: { quantity: -Number(decrease) } },
         { new: true },
      );

      if (!product) {
         const error: any = new Error("Product not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(200).json({
         success: true,
         product: product,
      });
   } catch (error) {
      next(error);
   }
}
