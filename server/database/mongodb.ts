import mongoose from "mongoose";
import { DB_URI } from "../config/env";

export const connectToDatabase = async () => {
   try {
      if (!DB_URI) {
         throw new Error("Please Define DB_URI environment variable");
      }
      await mongoose.connect(DB_URI);
   } catch (error) {
      console.error("Error connecting to database", error);
      process.exit(1);
   }
};
