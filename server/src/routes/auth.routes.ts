import { Router } from "express";
import { login, signup, logout, refresh, getCurrentUser } from "../controllers/auth.controller";

const authRouter = Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);
authRouter.get("/me", getCurrentUser);

export default authRouter;
