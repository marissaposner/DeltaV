import Joi from "joi";

import { SourceEnum } from "./enum.util";

export const SourceValidation = Joi.string().valid(
  ...Object.values(SourceEnum)
);

export const UuidValidation = Joi.string().guid({
  version: ["uuidv4"],
});

export const SimpleStringValidation = Joi.string().min(1);
