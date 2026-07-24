import express from "express";
import errorHandler from "./common/middleware/error-middleware";
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Health is Good",
  });
});

app.use(errorHandler);

export default app;
