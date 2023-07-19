import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./error/globalError";

app.use(cors());

console.log(app.get("env"));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use("/api/v1/", router);

// globalErrorHandler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
