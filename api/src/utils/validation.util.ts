import Joi from "joi";

import {
  DexFieldEnum,
  DexProductEnum,
  LendingFieldEnum,
  LendingProductEnum,
  MiscFieldEnum,
  MiscProductEnum,
  SourceEnum,
  TokenFieldEnum,
  TokenProductEnum,
} from "./enum.util";

export const FieldValidation = Joi.string().valid(
  ...Object.values(DexFieldEnum),
  ...Object.values(LendingFieldEnum),
  ...Object.values(MiscFieldEnum),
  ...Object.values(TokenFieldEnum)
);

export const ProductValidation = Joi.string().valid(
  ...Object.values(DexProductEnum),
  ...Object.values(LendingProductEnum),
  ...Object.values(MiscProductEnum),
  ...Object.values(TokenProductEnum)
);

export const SourceValidation = Joi.string().valid(
  ...Object.values(SourceEnum)
);

export const TokenProductValidation = Joi.string().valid(
  ...Object.values(TokenProductEnum)
);

export const UuidValidation = Joi.string().guid({
  version: ["uuidv4"],
});

export const SimpleStringValidation = Joi.string().min(1);
