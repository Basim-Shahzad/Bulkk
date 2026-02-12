import { Router } from "express";
import { getReports } from "../controllers/reports.controller";
import { auth } from "../middleware/auth.middleware";
import { AdminMiddleware, } from "../middleware/admin.middleware";

const reportsRouter = Router();

// Public routes
reportsRouter.get("/reports/sales", auth, AdminMiddleware, getReports);

export default reportsRouter;
