from subgrounds import Subgrounds
from subgrounds.pagination import ShallowStrategy
from subgrounds.subgraph import SyntheticField
from datetime import datetime
import pandas as pd

sg = Subgrounds()

# Create a new Subgrounds object
sg = Subgrounds()
balancer_v2 = sg.load_subgraph('https://api.thegraph.com/subgraphs/name/messari/balancer-v2-ethereum')

# Load the Uniswap v3 subgraph using a specific API endpoint
# uni = sg.load_subgraph(f'https://gateway.thegraph.com/api/{graph_api_key}/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7')
# b2f94294e72881a7cdfe13eaba5709f4
# 
# 
# # Create a SyntheticField on the LiquidityPool entity called `datetime`, which will format the createdTimestamp field into a human readable datetime string.
balancer_v2.LiquidityPool.datetime = SyntheticField(
    lambda timestamp: str(datetime.fromtimestamp(int(timestamp))),
    SyntheticField.FLOAT,
    balancer_v2.LiquidityPool.createdTimestamp
)

# Create a FieldPath object for the required fields in the liquidityPools entity.
# Specify options to sort the data by createdTimestamp in descending order and limit the number of results to 100.
liquidity_pools_query = balancer_v2.Query.liquidityPools(
    orderBy=balancer_v2.LiquidityPool.createdTimestamp, 
    orderDirection='desc', 
    first=100
)

# Field paths for each category
pool_identity_fields = [
    liquidity_pools_query._poolId,
    liquidity_pools_query.name,
    liquidity_pools_query.symbol,
    liquidity_pools_query.isSingleSided,
]

pool_metrics_fields = [
    liquidity_pools_query.createdBlockNumber,
    liquidity_pools_query.createdTimestamp,
    liquidity_pools_query.datetime,
    liquidity_pools_query.totalValueLockedUSD,
]

pool_revenue_fields = [
    liquidity_pools_query.cumulativeProtocolSideRevenueUSD,
    liquidity_pools_query.cumulativeSupplySideRevenueUSD,
    liquidity_pools_query.cumulativeTotalRevenueUSD,
]

pool_volume_fields = [
    liquidity_pools_query.cumulativeVolumeUSD,
    liquidity_pools_query.outputTokenPriceUSD,
]

pool_balances_fields = [
    liquidity_pools_query.inputTokenBalances,
    liquidity_pools_query.inputTokenWeights,
    liquidity_pools_query.outputTokenSupply,
    liquidity_pools_query.stakedOutputTokenAmount,
]

pool_rewards_fields = [
    liquidity_pools_query.rewardTokenEmissionsAmount,
    liquidity_pools_query.rewardTokenEmissionsUSD,
]

# Concatenate all field paths
liquidity_pools_fields = (
    pool_identity_fields
    + pool_metrics_fields
    + pool_revenue_fields
    + pool_volume_fields
    + pool_balances_fields
    + pool_rewards_fields
)

# Execute the query and store the results in a DataFrame
liquidity_pools_df = sg.query_df(liquidity_pools_fields)
# Print the results
print("Liquidity Pools:")
print(liquidity_pools_df)

