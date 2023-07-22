import Joi from "joi";
import { FindOptions } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import {
  FieldValidation,
  ProductValidation,
  SimpleStringValidation,
  SourceValidation,
  TokenProductValidation,
} from "../../utils/validation.util";
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

import { IBaseAttributes } from "../IBaseAttributes";

export interface IDataPointCreationAttributes {
  block: string;
  timestamp: string;

  value: string;

  sourceNameEnum: SourceEnum;
  productNameEnum:
    | DexProductEnum
    | LendingProductEnum
    | MiscProductEnum
    | TokenProductEnum;
  fieldNameEnum:
    | DexFieldEnum
    | LendingFieldEnum
    | MiscFieldEnum
    | TokenFieldEnum;

  token1: TokenProductEnum | null;
  token2: TokenProductEnum | null;
  token3: TokenProductEnum | null;
  token4: TokenProductEnum | null;

  // References
}

export type IDataPointUpdatingAttributes = Partial<
  Pick<
    IDataPointCreationAttributes,
    | "block"
    | "timestamp"
    | "value"
    | "sourceNameEnum"
    | "productNameEnum"
    | "fieldNameEnum"
    | "token1"
    | "token2"
    | "token3"
    | "token4"
  >
>;

export interface IDataPointAttributes
  extends IBaseAttributes,
    IDataPointCreationAttributes {}

export const DataPointCreationAttributesSchema =
  Joi.object<IDataPointCreationAttributes>({
    // Variables
    block: SimpleStringValidation.required(),
    timestamp: SimpleStringValidation.required(),

    value: SimpleStringValidation.required(),

    sourceNameEnum: SourceValidation.required(),
    productNameEnum: ProductValidation.required(),
    fieldNameEnum: FieldValidation.required(),

    token1: TokenProductValidation.optional(),
    token2: TokenProductValidation.optional(),
    token3: TokenProductValidation.optional(),
    token4: TokenProductValidation.optional(),

    // References
  })
    .meta({ className: "IDataPointCreationAttributes" })
    .description("The attributes for the creation of a data point db object");

@Table({
  tableName: "data_points",
  paranoid: true,
  underscored: true,
})
export default class DataPoint extends Model<
  IDataPointAttributes,
  IDataPointCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  block!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  timestamp!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  value!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  sourceNameEnum!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  productNameEnum!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fieldNameEnum!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  token1!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  token2!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  token3!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  token4!: string;

  static async getList(): Promise<IDataPointAttributes[]> {
    const queryParams: FindOptions<IDataPointAttributes> = {};

    const dataPoints = await this.findAll(queryParams);

    return dataPoints.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IDataPointAttributes | null> {
    const dataPoint = await this.findByPk(id);

    return dataPoint ? dataPoint.toJSON() : null;
  }
}
