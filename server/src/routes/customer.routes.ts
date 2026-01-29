import { Router } from "express";
import { createCustomer, deleteCustomerById, getCustomerById, getCustomers } from "../controllers/customer.controller";
import { auth } from "../middleware/auth.middleware";

const customerRouter = Router();

// Public routes
customerRouter.post("/customers", createCustomer);
customerRouter.get("/customers", auth,  getCustomers);
customerRouter.get("/customers/:id", auth, getCustomerById);
customerRouter.delete("/customers/:id", auth, deleteCustomerById);

export default customerRouter;
