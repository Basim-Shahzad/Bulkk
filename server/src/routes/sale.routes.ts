import { Router } from "express";
import { createSale } from "../controllers/sale.controller";
import { auth } from "../middleware/auth.middleware";

const salesRouter = Router();

// Public routes
salesRouter.post("/sales", auth, createSale);

export default salesRouter;
