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
} from "../../utils/enum.util";

export interface IDataPoint {
  id: string;

  block: string;
  value: string;
  timestamp: string;

  source_name: SourceEnum;
  product_name:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
  field_name: DexFieldEnum | LendingFieldEnum | MiscFieldEnum | TokenFieldEnum;
}
