import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import adminRoutes from "./routes/admin.routes";
import salesRoutes from "./routes/sale.routes";
import reportsRoutes from "./routes/reports.routes";
import { connectToDatabase } from "./database/mongodb";
import errorMiddleware from "./middleware/errors.middleware";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
   }),
);
app.use(express.json()); // Essential to read JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1);

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", adminRoutes);
app.use("/api", salesRoutes);
app.use("/api", reportsRoutes);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
   res.send("Server is running!");
});

const startServer = async () => {
   try {
      await connectToDatabase();
      console.log("Database connected successfully");

      app.listen(PORT, () => {
         console.log(`Server blasting off at http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
   }
};

startServer();