import {
  DexProductEnum,
  LendingProductEnum,
  MiscProductEnum,
  TokenProductEnum,
} from "../../utils/enum.util";

export interface IProduct {
  id: string;
  product_type:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;

  // Reference
  source_id: string;
}
