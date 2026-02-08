import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import { success, z } from "zod";
import { User } from "../models/user.model";
import { Store } from "../models/store.model";
import bcrypt from "bcrypt";

interface CustomError extends Error {
   statusCode?: number;
}

interface Staff {
   name: string;
   email: string;
   role: "admin" | "staff";
   storeName?: string;
   store: {
      _id: string;
      name: string;
   };
   isActive: boolean;
}

const StaffSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string(),
});

export async function createStaff(req: Request, res: Response, next: NextFunction) {
   try {
      const result = StaffSchema.safeParse(req.body);

      if (!result.success) {
         const errorMsg = result.error.issues.map((issue) => issue.message).join(", ");
         const err: CustomError = new Error(errorMsg);
         err.statusCode = 400;
         return next(err);
      }

      const store = await Store.findById(req.user.storeId)

      if (!store) {
         const err: CustomError = new Error("Not authorized - No store linked to user");
         err.statusCode = 401;
         return next(err);
      }

      const hashedPassword = await bcrypt.hash(result.data.name, 12);

      const newStaff: Staff = await User.create({
         ...result.data,
         password: hashedPassword,
         storeName: store.name,
         store: {
            _id: store._id,
            name: store.name,
         },
      });

      return res.status(201).json({
         success: true,
         customer: newStaff,
      });
   } catch (error) {
      next(error);
   }
}

export async function getStaff(req: Request, res: Response, next: NextFunction) {
   try {
      const storeId = req.user?.storeId;

      if (!storeId) {
         const err: CustomError = new Error("Not authorized - No store linked to user");
         err.statusCode = 401;
         return next(err);
      }

      const staff: Staff[] = await User.find({ store: storeId });

      console.log(staff)

      res.status(200).json({
         success: true,
         staffCount: staff.length,
         staff: staff,
      });
   } catch (error) {
      next(error);
   }
}

export async function getCustomerById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const customer: CustomerType | null = await Customer.findById(id);

      if (!customer) {
         const error: any = new Error("Customer not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(200).json({
         success: true,
         customer: customer,
      });
   } catch (error) {
      next(error);
   }
}

export async function deleteCustomerById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const customer: CustomerType | null = await Customer.findByIdAndDelete(id);

      if (!customer) {
         const error: any = new Error("Customer not found");
         error.statusCode = 404;
         return next(error);
      }

      res.status(204).json({
         success: true,
      });
   } catch (error) {
      next(error);
   }
}
