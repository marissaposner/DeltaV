export enum Source {
  DEFI_LLAMA = "DEFI_LLAMA",
}

export enum DexProduct {
  BALANCER = "BALANCER",
  CURVE = "CURVE",
  PANCAKESWAP = "PANCAKESWAP",
  SUSHISWAP = "SUSHISWAP",
  UNISWAP = "UNISWAP",
}

export enum LendingProduct {
  AAVE = "AAVE",
  COMPOUND = "COMPOUND",
  MORPHO = "MORPHO",
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
