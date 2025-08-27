import e from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./services/mongo.js";

const app = e();

app.use(e.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies to be sent
}));

//routes
app.use("/auth",authRoutes);

//connect to MongoDB
connectDB();

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
