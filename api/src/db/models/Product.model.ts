import { DexProductEnum, LendingProductEnum } from "../utils/enum.utils";

export interface IProduct {
  id: string;
  product_type: DexProductEnum | LendingProductEnum;

  // Reference
  source_id: string;
}
