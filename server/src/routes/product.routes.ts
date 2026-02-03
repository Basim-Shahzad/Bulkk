import { Router } from "express";
import { createProduct, getProductById, getProducts, increaseProductStockById, decreaseProductStockById, deleteProductById, updateProduct } from "../controllers/product.controller";
import { auth } from "../middleware/auth.middleware";

const productRouter = Router();

// Public routes
productRouter.post("/products", createProduct);
productRouter.get("/products", auth,  getProducts);
productRouter.get("/products/:id", auth, getProductById);
productRouter.delete("/products/:id", auth, deleteProductById);
productRouter.patch("/products/:id", auth, updateProduct);
productRouter.patch("/products/:id/stock-in", auth, increaseProductStockById);
productRouter.patch("/products/:id/stock-out", auth, decreaseProductStockById);

export default productRouter;
