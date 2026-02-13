import mongoose from "mongoose";

export const connectToDatabase = async () => {
   try {
      const DB_URI = process.env.DB_URI
      if (!DB_URI) {
         throw new Error("Please Define DB_URI environment variable");
      }
      await mongoose.connect(DB_URI);
   } catch (error) {
      console.error("Error connecting to database", error);
      process.exit(1);
   }
};
