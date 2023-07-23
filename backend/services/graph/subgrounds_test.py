from subgrounds import Subgrounds
from subgrounds.pagination import ShallowStrategy
sg = Subgrounds()
GRAPH_API_KEY = "577abd5f1252a701cb17ab45a2098454"

# Load
aave_v3 = sg.load_subgraph(
    "https://api.thegraph.com/subgraphs/name/messari/aave-v3-ethereum")
latest = aave_v3.Query.markets(
    orderBy=aave_v3.Market.totalValueLockedUSD,
    orderDirection='desc',
    first=5,
)

# Return query to a dataframe
# print(sg.query_df([
#     latest.name,
#     latest.totalValueLockedUSD,
# ]))




aave_markets = aave_v3.Query.markets(
    orderBy=aave_v3.Market.totalValueLockedUSD,
    orderDirection="desc",
    where=[
        aave_v3.Market.createdBlockNumber > 14720000
    ])
# print(aave_markets)

# print(sg.query([
#     aave_markets.createdBlockNumber,
#     aave_markets.createdTimestamp,
#     aave_markets.name,
#     aave_markets.totalValueLockedUSD,
#     aave_markets.token.id,
# ])) 


uni = sg.load_subgraph(f'https://gateway.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7')
# b2f94294e72881a7cdfe13eaba5709f4
# Query the financialsDailySnapshots endpoint with a specified order, limit, and filter criteria
latest_snapshots = uni.Query.financialsDailySnapshots(
  orderBy=uni.FinancialsDailySnapshot.timestamp,
  orderDirection='desc',
  first=1,
)

# Convert the query results to a Pandas dataframe and extract the first row
# res = sg.query_df(latest_snapshots).squeeze()
# print(res)

pools = uni.Query.liquidityPools(
  first=1,
  orderBy=uni.LiquidityPool.totalValueLockedUSD,
  orderDirection='desc'
)

# Execute the query, convert the results into a Pandas dataframe, and extract the first row as a Pandas series.
# res2 = sg.query_df(pools).squeeze()
# print(res2)


protocol = uni.Query.dexAmmProtocols(
  first=1
)

# Execute the query, convert the results into a Pandas dataframe, and extract the first row as a Pandas series.
res3 = sg.query_df(protocol).squeeze()

# Store the resulting Pandas series in res3.
res3
print(res3)

