import { Router, Request, Response } from "express";

import { ERROR_CODE, respondError } from "../../utils/responseManager.util";

const catchAllRouter = Router();

catchAllRouter.all(
  "*",
  (req: Request, res: Response): Response =>
    respondError(res, ERROR_CODE.NOT_FOUND, "404")
);

export default catchAllRouter;
