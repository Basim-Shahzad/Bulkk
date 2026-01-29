import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { success, z } from "zod";
import { ICustomer, Customer } from "../models/customer.model";
import { Store } from "../models/store.model";

interface CustomError extends Error {
   statusCode?: number;
}

const CustomerSchema = z.object({
   name: z.string().min(1, "Name is required"),
   phone: z.string(),
   email: z.string(),
   store: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Store ID format",
   }),
});

type CustomerType = z.infer<typeof CustomerSchema>;

export async function createCustomer(req: Request, res: Response, next: NextFunction) {
   try {
      const result = CustomerSchema.safeParse(req.body);

      if (!result.success) {
         const errorMsg = result.error.issues.map((issue) => issue.message).join(", ");
         const err: CustomError = new Error(errorMsg);
         err.statusCode = 400;
         return next(err);
      }

      const data: CustomerType = result.data;

      // Later check if the store exists

      const newCustomer = await Customer.create({
         ...data,
         store: new mongoose.Types.ObjectId(data.store),
      });

      return res.status(201).json({
         success: true,
         customer: newCustomer,
      });
   } catch (error) {
      next(error);
   }
}

export async function getCustomers(req: Request, res: Response, next: NextFunction) {
   try {
      const storeId = req.user?.storeId;

      if (!storeId) {
         const err: CustomError = new Error("Not authorized - No store linked to user");
         err.statusCode = 401;
         return next(err);
      }

      const customers: CustomerType[] = await Customer.find({ store: storeId });

      res.status(200).json({
         success: true,
         customersCount: customers.length,
         customers: customers,
      });
   } catch (error) {
      next(error);
   }
}

export async function getCustomerById(req: Request, res: Response, next: NextFunction) {
   try {
      const { id } = req.params;

      const customer: CustomerType | null = await Customer.findById(id)

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
      next(error)
   }
}