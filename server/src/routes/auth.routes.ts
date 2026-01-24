import { Router } from "express";
import { login, signup, logout } from "../controllers/auth.controller";

const authRouter = Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
