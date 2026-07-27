import express from "express";
import errorHandler from "./common/middleware/error-middleware";
import authRoute from "./modules/auth/auth.routes.ts";
import learningRoute from "./modules/learning/learning.routes.ts";
import goalRoute from "./modules/goal/goal.routes.ts";
import dashboardRoute from "./modules/dashboard/dashboard.routes.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/learning", learningRoute);
app.use("/api/goal", goalRoute);
app.use("/api/dashboard", dashboardRoute);

app.use(errorHandler);

export default app;
