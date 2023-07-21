import {
  DexFieldEnum,
  LendingFieldEnum,
  MiscFieldEnum,
  TokenFieldEnum,
} from "../../utils/enum.util";

export interface IField {
  id: string;
  field_type: DexFieldEnum | LendingFieldEnum | MiscFieldEnum | TokenFieldEnum;

  // Reference
  product_id: string;
}
