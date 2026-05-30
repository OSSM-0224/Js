import express from "express";
import listroutes from "./routes/lists.routes.js";

const app = express();
app.use(express.json());

app.use("/api/lists", listroutes);
export default app;
