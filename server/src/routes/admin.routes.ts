import { Router } from "express";
import { createStaff, getStaff } from "../controllers/admin.controller";
import { auth } from "../middleware/auth.middleware";

const staffRouter = Router();

// Public routes
staffRouter.get("/staff", auth, getStaff);
staffRouter.post("/staff", auth, createStaff);

export default staffRouter;
