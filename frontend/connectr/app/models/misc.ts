import { ActionTypeEnum, OperatorEnum } from "./products";

export const OperatorFieldEnums = {
    [OperatorEnum.GREATER_THAN]: "Greater Than",
    [OperatorEnum.LESS_THAN]: "Less Than",
    [OperatorEnum.EQUALS]: "Equals",
};

export const OperatorSymbolEnums = {
    [OperatorEnum.GREATER_THAN]: ">",
    [OperatorEnum.LESS_THAN]: "<",
    [OperatorEnum.EQUALS]: "=",
};

export const ActionFieldEnums = {
    [ActionTypeEnum.SWAP]: "Swap",
    [ActionTypeEnum.TRANSFER]: "Transfer",
};