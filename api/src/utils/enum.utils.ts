export enum SourceEnum {
  DEFI_LLAMA = "DEFI_LLAMA",
}

export enum DexProductEnum {
  BALANCER = "BALANCER",
  CURVE = "CURVE",
  PANCAKESWAP = "PANCAKESWAP",
  SUSHISWAP = "SUSHISWAP",
  UNISWAP = "UNISWAP",
}

export enum LendingProductEnum {
  AAVE = "AAVE",
  COMPOUND = "COMPOUND",
  MORPHO = "MORPHO",
}

export enum LendingFieldEnum {
  COUNT_TRANSACTIONS = "COUNT_TRANSACTIONS",
  COUNT_TRANSACTIONS_BORROW = "COUNT_TRANSACTIONS_BORROW",
  COUNT_TRANSACTIONS_SUPPLY = "COUNT_TRANSACTIONS_SUPPLY",
  COUNT_UNIQUE_BORROWERS = "COUNT_UNIQUE_BORROWERS",
  COUNT_UNIQUE_SUPPLIERS = "COUNT_UNIQUE_SUPPLIERS",
  RATE_APR = "RATE_APR",
  RATE_APY = "RATE_APY",
  SUM_AMOUNT_BORROW = "SUM_AMOUNT_BORROW",
  SUM_AMOUNT_SUPPLY = "SUM_AMOUNT_SUPPLY",
  TVL = "TVL",
}

export const LendingFieldNames = {
  count_transactions: "Transaction Count",
  count_transactions_borrow: "Borrow Transaction Count",
  count_transactions_supply: "Supply Transaction Count",
  count_unique_borrowers: "Unique Borrowers Count",
  count_unique_suppliers: "Unique Suppliers Count",
  rate_apr: "APR",
  rate_apy: "APY",
  sum_amount_borrow: "Total Borrow Amount",
  sum_amount_supply: "Total Supply Amount",
  tvl: "TVL",
};
