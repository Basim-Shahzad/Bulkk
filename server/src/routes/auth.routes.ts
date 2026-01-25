import { Router } from "express";
import { login, signup, logout, refresh } from "../controllers/auth.controller";

const authRouter = Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);

export default authRouter;
