import e from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import 'dotenv/config';

const app = e();

app.use(e.json());
app.use(cookieParser());

//routes
app.use("/auth",authRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
