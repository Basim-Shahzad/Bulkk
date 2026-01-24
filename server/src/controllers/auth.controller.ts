import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env";

interface CustomError extends Error {
   statusCode?: number;
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const { username, email, password } = req.body;

      // Validation in order to if the user already exists, throw error if does
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         const error: CustomError = new Error("User already exists");
         error.statusCode = 409;
         throw error;
      }

      // Hashing the password so it is not stored in plain text
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // creating the user in the db
      const [newUser] = await User.create([{ username, email, password: hashedPassword }], { session });

      // creating the jwt token
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
         success: true,
         message: "User created successfully",
         data: {
            token,
            user: newUser[0],
         },
      });
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
   }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { email, password } = req.body;

      // Validation in order to if the user already exists, throw error if does
      const user = await User.findOne({ email });
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

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.status(200).json({
         success: true,
         message: "User logged in successfully",
         data: {
            token,
            user,
         },
      });
   } catch (error) {
      next(error);
   }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
   try {
   } catch (error) {}
};
