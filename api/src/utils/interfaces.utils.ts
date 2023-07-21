import { DexProduct, LendingProduct, Source } from "./enum.utils";


interface ISource {
    id: string;
    source_type: Source;
}

export interface IProduct {
    id: string;
    product_type: DexProduct | LendingProduct;
    
    // Reference
    source_id: string
}

interface IField {
    id: string;

    // Reference
    product_id: string
}

export interface ILendingField extends IField {
    count_transactions: string;
    count_transactions_borrow: string;
    count_transactions_supply: string;
    count_unique_borrowers: string;
    count_unique_suppliers: string;
    rate_apr: string;
    rate_apy: string;
    sum_amount_borrow: string;
    sum_amount_supply: string;
    tvl: string;
}

interface IDataPoint {
    id: string;
    value: string;
    timestamp: string;
    block: string;
    source: string;
    product: string;
}

interface ILendingDataPoint extends IDataPoint {
    product: LendingProduct;
}

interface IDexDataPoint extends IDataPoint {
    product: DexProduct;
}

interface IStaticPoint {
    id: string;
    source: DexProduct | LendingProduct;
    value: string;
    timestamp: string;
    block: string;
}





Lending: AAVE, Compound, Morpho
APY
TVL
APR
Volume
Transactions # count
# of unique depositors
sum of deposit amounts
# of unique borrowers
# of deposits
# of borrows
Sum of borrow amounts



DEXes: Uniswap, Pancakeswap, Curve, Balancer (token A, token B)
Dynamic Fields:
# of swaps
TVL
Volume
# of unique users
# of LPs
Deposited
count deposit events
sum amounts of deposit events
Withdrawn
count withdraw events
sum amounts of withdraw events
 Swapped
 count swap events
sum amounts of swap events

Static Fields:
Pool address 
Token A address
Token B address
Token A name
Token B name
Token A symbol
Token B symbol

Tokens: ETH, USDC, WstETH (from lido), rETH, DAI, USDT, MATIC, BNB, WBTC, 
Dynamic fields:
Price 
# of tokens in circulation 
 Static Fields:
Name 
address
