import Joi from "joi";
import { FindOptions } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { FieldValidation, UuidValidation } from "../../utils/validation.util";
import {
  DexFieldEnum,
  LendingFieldEnum,
  MiscFieldEnum,
  TokenFieldEnum,
} from "../../utils/enum.util";

import { IBaseAttributes } from "../IBaseAttributes";
import Product from "./Product.model";

export interface IFieldCreationAttributes {
  fieldNameEnum:
    | DexFieldEnum
    | LendingFieldEnum
    | MiscFieldEnum
    | TokenFieldEnum;

  // References
  productId: string;
}

export type IFieldUpdatingAttributes = Partial<
  Pick<IFieldCreationAttributes, "fieldNameEnum" | "productId">
>;

export interface IFieldAttributes
  extends IBaseAttributes,
    IFieldCreationAttributes {}

export const FieldCreationAttributesSchema =
  Joi.object<IFieldCreationAttributes>({
    // Variables
    fieldNameEnum: FieldValidation.required(),

    // References
    productId: UuidValidation.required(),
  })
    .meta({ className: "IFieldCreationAttributes" })
    .description("The attributes for the creation of a field db object");

@Table({
  tableName: "fields",
  paranoid: true,
  underscored: true,
})
export default class Field extends Model<
  IFieldAttributes,
  IFieldCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fieldNameEnum!: string;

  @BelongsTo(() => Product, {
    foreignKey: { name: "productId", allowNull: false },
    as: "product",
  })
  productId!: Product;

  static async getList(): Promise<IFieldAttributes[]> {
    const queryParams: FindOptions<IFieldAttributes> = {};

    const fields = await this.findAll(queryParams);

    return fields.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<IFieldAttributes | null> {
    const field = await this.findByPk(id);

    return field ? field.toJSON() : null;
  }
}
