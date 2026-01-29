import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import { connectToDatabase } from "../database/mongodb";
import errorMiddleware from "./middleware/errors.middleware";

const app: Application = express();
const PORT: number = 5000;

// Middleware
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true, // Required to allow cookies to be sent back and forth
   }),
);
app.use(express.json()); // Essential to read JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);

app.get("/", (req: Request, res: Response) => {
   res.send("Server is running!");
});

app.listen(PORT, async () => {
   console.log(`Server blasting off at http://localhost:${PORT}`);
   try {
      await connectToDatabase();
      console.log("Database connected successfully");
   } catch (error) {
      console.error("Database connection failed during startup", error);
   }
});
