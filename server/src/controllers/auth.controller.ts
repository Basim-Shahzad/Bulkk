import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Store } from "../models/store.model";
import { User, IUser } from "../models/user.model";
import { signRefreshToken, signAccessToken } from "../utils/jwt";
import { userForResponse } from "../utils/auth.utils";

interface CustomError extends Error {
   statusCode?: number;
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { name, email, password, storeName } = req.body;

      if (!storeName) {
         const err: CustomError = new Error("Store name is required");
         err.statusCode = 400;
         throw err;
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         const err: CustomError = new Error("User already exists");
         err.statusCode = 409;
         throw err;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // 1️⃣ Create Store
      const store = await Store.create({
         name: storeName,
         email,
         owner: new mongoose.Types.ObjectId(),
      });

      // 2️⃣ Create Admin User linked to store
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role: "admin",
         store: store._id,
      });

      // 3️⃣ Fix owner reference
      store.owner = user._id;
      await store.save();

      // 4️⃣ Tokens
      const payload = {
         userId: user._id,
         storeId: store._id,
         role: user.role,
      };

      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         path: "/",
      })
         .status(201)
         .json({
            accessToken,
            user: userForResponse(user),
         });
   } catch (error) {
      next(error);
   }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password").populate("store", "name")
      if (!user) {
         const error: CustomError = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         const error: CustomError = new Error("Invalid Password");
         error.statusCode = 401;
         throw error;
      }

      const payload = {
         userId: user._id,
         storeId: user.store,
         role: user.role,
      };

      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         path: "/",
      })
         .status(200)
         .json({
            accessToken,
            user: userForResponse(user),
         });
   } catch (error) {
      next(error);
   }
};

export const refresh = (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.refreshToken;
      if (!token) {
         const err: CustomError = new Error("No refresh token");
         err.statusCode = 401;
         throw err;
      }

      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

      const newAccessToken = signAccessToken({
         userId: decoded.userId,
         storeId: decoded.storeId,
         role: decoded.role,
      });

      res.json({ accessToken: newAccessToken });
   } catch (error) {
      next(error);
   }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
   try {
      res.clearCookie("refreshToken", {
         path: "/",
      }).sendStatus(204);
   } catch (error) {
      next(error);
   }
};
