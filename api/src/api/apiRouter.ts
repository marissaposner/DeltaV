import { Router } from "express";

import randomRouter from "./routes/random.routes";

const apiRouter = () => {
  const appRouter = Router();

  appRouter.use("/random", randomRouter);

  return appRouter;
};

export default apiRouter;
