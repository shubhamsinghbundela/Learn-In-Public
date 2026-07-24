import express from "express";
import errorHandler from "./common/middleware/error-middleware";
import authRoute from "./modules/auth/auth.routes.ts";
// import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   }),
// );

// app.use(cookieParser());

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use("/api/auth", authRoute);

app.use(errorHandler);

export default app;
