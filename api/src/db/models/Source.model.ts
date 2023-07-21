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

import { SourceValidation } from "../../utils/validation.util";
import { SourceEnum } from "../../utils/enum.util";

import { IBaseAttributes } from "../IBaseAttributes";

export interface ISourceCreationAttributes {
  sourceNameEnum: SourceEnum;

  // References
}

export type ISourceUpdatingAttributes = Partial<
  Pick<ISourceCreationAttributes, "sourceNameEnum">
>;

export interface ISourceAttributes
  extends IBaseAttributes,
    ISourceCreationAttributes {}

export const SourceCreationAttributesSchema =
  Joi.object<ISourceCreationAttributes>({
    // Variables
    sourceNameEnum: SourceValidation.label("source name").required(),

    // References
  })
    .meta({ className: "ISourceCreationAttributes" })
    .description("The attributes for the creation of a source db object");

export const SourceUpdatingAttributesSchema = Joi.object({
  // Variables
  sourceNameEnum: SourceValidation.optional(),
})
  .meta({ className: "ISourceUpdatingAttributes" })
  .description("The attributes for the updating of a source db object");

@Table({
  tableName: "sources",
  paranoid: true,
  underscored: true,
})
export default class Source extends Model<
  ISourceAttributes,
  ISourceCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  sourceNameEnum!: string;

  static async getList(): Promise<ISourceAttributes[]> {
    const queryParams: FindOptions<ISourceAttributes> = {};

    const sources = await this.findAll(queryParams);

    return sources.map((a) => a.toJSON());
  }

  static async getOneById(id: string): Promise<ISourceAttributes | null> {
    const source = await this.findByPk(id);

    return source ? source.toJSON() : null;
  }

  static async getOneByName(
    sourceNameEnum: SourceEnum
  ): Promise<ISourceAttributes | null> {
    const source = await this.findOne({
      where: {
        sourceNameEnum,
      },
    });

    return source ? source.toJSON() : null;
  }
}
