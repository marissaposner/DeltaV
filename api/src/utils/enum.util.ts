export enum SourceEnum {
  DEFI_LLAMA = "DEFI_LLAMA",
}

// DEX DETAILS

export enum DexProductEnum {
  BALANCER = "BALANCER",
  CURVE = "CURVE",
  PANCAKESWAP = "PANCAKESWAP",
  SUSHISWAP = "SUSHISWAP",
  UNISWAP = "UNISWAP",
}

export const DexProductNames = {
  [DexProductEnum.BALANCER]: "Balancer",
  [DexProductEnum.CURVE]: "Curve",
  [DexProductEnum.PANCAKESWAP]: "Pancake Swap",
  [DexProductEnum.SUSHISWAP]: "Sushi Swap",
  [DexProductEnum.UNISWAP]: "Uniswap",
};

export enum DexFieldEnum {
  COUNT_DEPOSITS = "COUNT_DEPOSITS",
  COUNT_SWAPS = "COUNT_SWAPS",
  COUNT_WITHDRAWALS = "COUNT_WITHDRAWALS",
  COUNT_UNIQUE_LPS = "COUNT_UNIQUE_LPS",
  COUNT_UNIQUE_USERS = "COUNT_UNIQUE_USERS",
  SUM_DEPOSITS_TOKEN_1 = "SUM_DEPOSITS_TOKEN_1",
  SUM_DEPOSITS_TOKEN_2 = "SUM_DEPOSITS_TOKEN_2",
  SUM_SWAPS_TOKEN_1 = "SUM_SWAPS_TOKEN_1",
  SUM_SWAPS_TOKEN_2 = "SUM_SWAPS_TOKEN_2",
  SUM_WITHDRAWALS_TOKEN_1 = "SUM_WITHDRAWALS_TOKEN_1",
  SUM_WITHDRAWALS_TOKEN_2 = "SUM_WITHDRAWALS_TOKEN_2",
  TVL = "TVL",
}

export const DexFieldNames = {
  [DexFieldEnum.COUNT_DEPOSITS]: "Deposit Transaction Count",
  [DexFieldEnum.COUNT_SWAPS]: "Swap Transaction Count",
  [DexFieldEnum.COUNT_WITHDRAWALS]: "Withdraw Transaction Count",
  [DexFieldEnum.COUNT_UNIQUE_LPS]: "Unique LPs Count",
  [DexFieldEnum.COUNT_UNIQUE_USERS]: "Unique Users Count",
  [DexFieldEnum.SUM_DEPOSITS_TOKEN_1]: "Sum of deposits for token 1",
  [DexFieldEnum.SUM_DEPOSITS_TOKEN_2]: "Sum of deposits for token 2",
  [DexFieldEnum.SUM_SWAPS_TOKEN_1]: "Sum of swaps for token 1",
  [DexFieldEnum.SUM_SWAPS_TOKEN_2]: "Sum of swaps for token 2",
  [DexFieldEnum.SUM_WITHDRAWALS_TOKEN_1]: "Sum of withdraws for token 1",
  [DexFieldEnum.SUM_WITHDRAWALS_TOKEN_2]: "Sum of withdraws for token 2",
  [DexFieldEnum.TVL]: "TVL",
};

// LENDING DETAILS

export enum LendingProductEnum {
  AAVE = "AAVE",
  COMPOUND = "COMPOUND",
  MORPHO = "MORPHO",
}

export const LendingProductNames = {
  [LendingProductEnum.AAVE]: "Aave",
  [LendingProductEnum.COMPOUND]: "Compound",
  [LendingProductEnum.MORPHO]: "Morpho",
};

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
  [LendingFieldEnum.COUNT_TRANSACTIONS]: "Transaction Count",
  [LendingFieldEnum.COUNT_TRANSACTIONS_BORROW]: "Borrow Transaction Count",
  [LendingFieldEnum.COUNT_TRANSACTIONS_SUPPLY]: "Supply Transaction Count",
  [LendingFieldEnum.COUNT_UNIQUE_BORROWERS]: "Unique Borrowers Count",
  [LendingFieldEnum.COUNT_UNIQUE_SUPPLIERS]: "Unique Suppliers Count",
  [LendingFieldEnum.RATE_APR]: "APR",
  [LendingFieldEnum.RATE_APY]: "APY",
  [LendingFieldEnum.SUM_AMOUNT_BORROW]: "Total Borrow Amount",
  [LendingFieldEnum.SUM_AMOUNT_SUPPLY]: "Total Supply Amount",
  [LendingFieldEnum.TVL]: "TVL",
};

// MISC DETAILS

export enum MiscProductEnum {
  GAS = "GAS",
}

export const MiscProductNames = {
  [MiscProductEnum.GAS]: "Gas",
};

export enum MiscFieldEnum {
  GAS_PRICE = "GAS_PRICE",
}

export const MiscFieldNames = {
  [MiscFieldEnum.GAS_PRICE]: "Gas Price",
};

// TOKEN DETAILS

export enum TokenProductEnum {
  DAI = "DAI",
  ETH = "ETH",
  MATIC = "MATIC",
  RETH = "RETH",
  STETH = "STETH",
  USDC = "USDC",
  USDT = "USDT",
  WBTC = "WBTC",
}

export const TokenProductNames = {
  [TokenProductEnum.DAI]: "DAI",
  [TokenProductEnum.ETH]: "Ether",
  [TokenProductEnum.MATIC]: "Polygon MATIC",
  [TokenProductEnum.RETH]: "RocketPool rETH",
  [TokenProductEnum.STETH]: "Lido stETH",
  [TokenProductEnum.USDC]: "USD Coin",
  [TokenProductEnum.USDT]: "USDT",
  [TokenProductEnum.WBTC]: "Wrapped Bitcoin",
};

export enum TokenFieldEnum {
  PRICE = "PRICE",
  CIRCULATING_TOKEN_VOLUME = "CIRCULATING_TOKEN_VOLUME",
}

export const TokenFieldNames = {
  [TokenFieldEnum.PRICE]: "Price",
  [TokenFieldEnum.CIRCULATING_TOKEN_VOLUME]: "Amount of tokens in circulation",
};
