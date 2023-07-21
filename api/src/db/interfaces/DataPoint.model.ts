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
  timestamp: string;

  value: string;

  source_name: SourceEnum;
  product_name:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
  field_name: DexFieldEnum | LendingFieldEnum | MiscFieldEnum | TokenFieldEnum;

  token_1: TokenProductEnum | null;
  token_2: TokenProductEnum | null;
  token_3: TokenProductEnum | null;
  token_4: TokenProductEnum | null;
}
