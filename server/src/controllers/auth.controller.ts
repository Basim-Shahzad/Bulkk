import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env";
import { signRefreshToken, signAccessToken } from "../utils/jwt";

interface CustomError extends Error {
   statusCode?: number;
}

import { Store } from "../models/store.model";

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
         owner: new mongoose.Types.ObjectId(), // temp
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
         path: "/api/auth/refresh",
      })
         .status(201)
         .json({ accessToken });
   } catch (error) {
      next(error);
   }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, password } = req.body;

      // Validation in order to if the user already exists, throw error if does
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
         const error: CustomError = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      // Validation in order check if the password is correct or not
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         const error: CustomError = new Error("Invalid Password");
         error.statusCode = 401;
         throw error;
      }

      // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

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
         path: "/api/auth/refresh",
      }).json({ accessToken });

      // res.status(200).json({
      //    success: true,
      //    message: "User logged in successfully",
      //    data: {
      //       token,
      //       user,
      //    },
      // });
   } catch (error) {
      next(error);
   }
};

export const refresh = (req: Request, res: Response) => {
   const token = req.cookies.refreshToken;
   if (!token) throw new Error("No refresh token");

   const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

   const newAccessToken = signAccessToken({
      userId: decoded.userId,
      storeId: decoded.storeId,
      role: decoded.role,
   });

   res.json({ accessToken: newAccessToken });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
   try {
      res.clearCookie("refreshToken", {
         path: "/api/auth/refresh",
      }).sendStatus(204);
   } catch (error) {}
};
