import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import "express-async-errors";

import apiRouter from "./api/apiRouter";
import catchAll404 from "./api/middlewares/catchAll404.middleware";
import env from "./utils/env.util";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(morgan("tiny"));

app.use(`/${env.server.apiVersion}`, apiRouter());
app.use(catchAll404);

export default app;
