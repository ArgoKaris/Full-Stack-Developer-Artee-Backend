import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import taskRouter from "./router/task.router";
import dashboardRouter from "./router/dashboard.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

export default app;