import { Router } from "express";
import { createSale, getSales, getSaleById } from "../controllers/sale.controller";
import { auth } from "../middleware/auth.middleware";
import { AdminMiddleware } from "../middleware/admin.middleware";
import { Admin } from "mongodb";

const salesRouter = Router();

// Public routes
salesRouter.post("/sales", auth, createSale);
salesRouter.get("/sales", auth, AdminMiddleware,  getSales);
salesRouter.get("/sales:id", auth, AdminMiddleware,  getSaleById);

export default salesRouter;
