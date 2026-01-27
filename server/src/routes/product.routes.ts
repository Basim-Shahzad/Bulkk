import { Router } from "express";
import { createProduct, getProductById, getProducts, increaseProductStockById } from "../controllers/product.controller";
import { auth } from "../middleware/auth.middleware";

const productRouter = Router();

// Public routes
productRouter.post("/products", createProduct);
productRouter.get("/products", auth,  getProducts);
productRouter.get("/products/:id", auth, getProductById);
productRouter.patch("/products/:id/stock-in", auth, increaseProductStockById);

export default productRouter;
