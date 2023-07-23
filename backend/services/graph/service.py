import datetime as dt
import json
import os

import pandas as pd
import requests
import sys
from backend.services.graph.queries import queries


sys.path.append('../')

from backend.config import GRAPH_API_KEY, BEARER_TOKEN
from backend.services.graph.subgraphs import SubgraphService
DEFAULT_PROTOCOL = "aave-forks"
DEFAULT_CHAIN = "ethereum"
from backend.database.send_data import DbService
from backend.services.graph.queries import queries
from backend.services.graph.address_pairs import get_address_pairs
CHAINS = [
    "arbitrum",
    "aurora",
    "avalanche",
    "boba",
    "bsc",
    "celo",
    "clover",
    "ethereum",
    "fantom",
    "fuse",
    "gnosis",
    "harmony",
    "optimism",
    "polygon",
    "moonbeam",
    "moonriver",
]
address_list = get_address_pairs()
dex_table_structure="""id SERIAL PRIMARY KEY,
    timestamp VARCHAR(255),
    blocknumber TEXT,
    hash VARCHAR(255),
    logindex VARCHAR(255),
    tokenin TEXT,
    tokenout TEXT,
    amountout VARCHAR(255), 
    amountoutusd VARCHAR(255),
    amountin VARCHAR(255), 
    amountinusd VARCHAR(255),
    source VARCHAR(255)"""

# arbitrum_subgraphs =['JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk']
def execute_query_thegraph(subgraph_id, query, hosted=True):
    namespace = "messari"
    print(subgraph_id)
    
    if hosted:
        base_url = f"https://api.thegraph.com/subgraphs/name/{namespace}/"
        # print('base_url', base_url)
        headers = {
        'Content-Type': 'application/json'  # If you are sending JSON data in the request body
        }
    # if subgraph_id in arbitrum_subgraphs:
    #     print('in arbitrum subgraphs')
    #     base_url = f"https://gateway-arbitrum.network.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
    #     print('base_url', base_url)

    else:
        # base_url = f"https://gateway.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
        # base_url = f"https://gateway-arbitrum.network.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
        base_url = f"https://gateway-arbitrum.network.thegraph.com/api/subgraphs/id/"

        # print('base_url', base_url)
        bearer_token = BEARER_TOKEN  # Replace with your actual Bearer token
        headers = {
            'Authorization': f'Bearer {bearer_token}',
            'Content-Type': 'application/json'  # If you are sending JSON data in the request body
        }

    query_url = f"{base_url}{subgraph_id}"

    # print('query_url',query_url)
    r = requests.post(query_url, json={"query": query}, headers=headers)
    r.raise_for_status()
    try:
        # assumes only one table is being queried
        first_table_name = list(r.json()["data"].keys())[0]
        return r.json()["data"][first_table_name]
    except KeyError:
        # TODO: error handling
        print(r.json())
class GraphService:
    def __init__(self, protocol=DEFAULT_PROTOCOL, chain=DEFAULT_CHAIN):
        # print('protocol', protocol)
        # print('DEFAULT CHAIN', chain)
        # os.chdir('..')
        self.build_subgraphs_json()
        # print('after build_subgraphs_json')
        self.subgraph = SubgraphService(protocol, chain)
    
    def ensure_enumerable(self, data):
        if not isinstance(data, list):
            return [data]
        return data

    def query_thegraph(self, gql):
        data = execute_query_thegraph(
            self.subgraph.query_id,
            gql,
            hosted=(self.subgraph.service_type == "hosted-service"),
        )
        if data == None:
            raise ValueError("Data from execute_query_thegraph was None.")
        data = self.ensure_enumerable(data)
        for dict_item in data:
            for key, val in dict_item.items():
                if key == "timestamp":
                    # print(dt.datetime.utcfromtimestamp(int(val)).strftime('%Y-%m-%d %H:%M:%S'))
                    dict_item[key] = dt.datetime.utcfromtimestamp(int(val)).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
        print("==========the graph response (formatted):==========\n", data)
        return data
    

    def build_subgraphs_json(self):
        # sys.path.append('../')
        # print('sys.path', sys.path)
        # print('os.getcwdb()', os.getcwdb())
        # print('whole path', os.getcwdb().decode("utf-8") + "/subgraphs/deployment/deployment.json")
        deployments = json.load(
            open(os.getcwdb().decode("utf-8") + "/subgraphs/deployment/deployment.json")
        )
        li = []
        for protocol in deployments:
            # for chain in CHAINS:
            # print('in protocol')
            try:
                df = pd.DataFrame([SubgraphService(protocol, 'ethereum').__dict__])
                df.pop("protocol")
                df = df.join(df["deployments"].apply(pd.Series), lsuffix="_")
                df.pop("deployments_")
                df["deployments"].iloc[0] = (
                    df["deployments"]
                    .apply(pd.Series)[f"{protocol}-{'ethereum'}"]
                    .iloc[0]
                )
                li.append(df)
            except NotImplementedError:
                pass
        df = pd.concat(li)
        df = df.set_index(["protocol", "chain"])
        json_dump = df.to_json(
            indent=2,
            orient="index",
        ).replace("\\/", "/")
        # print(
        #     json_dump,
        #     file=open(
        #         os.path.join(
        #             os.getcwdb().decode("utf-8"),
        #             "backend/services/graph/",
        #             "subgraphs.json",
        #         ),
        #         "w",
        #     ),
        # )
        return df

query = """{
  tokens(first: 5) {
    id
    name
    symbol
    decimals
  }
  rewardTokens(first: 5) {
    id
    token {
      id
    }
    type
  }
}"""

query1 = """{
  markets (where: {inputToken_: {symbol_not: "GHO"}}) {
    inputToken {
        name
        id
        symbol
      }
      outputToken {
        name
        symbol
        id
      }
    hourlySnapshots (first: 100, orderBy: blockNumber, orderDirection: desc) {
    totalValueLockedUSD
    timestamp
    rates(where: {side: BORROWER, type: VARIABLE}) {
      rate
      maturityBlock
      side
      type
    }
  }
}
}"""

query_liquidity = """
{
  liquidityPools(orderBy: createdTimestamp, orderDirection: desc) {
    createdTimestamp
    createdBlockNumber
    name
    id
    symbol
    totalValueLockedUSD
    cumulativeVolumeUSD
  }
}"""

query_uniswap_pools = """{
  markets {
    inputToken {
        name
        id
        symbol
      }
      outputToken {
        name
        symbol
        id
      }
    hourlySnapshots (first: 1000000, orderBy: blockNumber, orderDirection: desc) {
    totalValueLockedUSD
    timestamp
  }
}
}"""

query_aave="""{
  markets(where: {inputToken_: {symbol: "WETH"}}) {
    id
    inputToken {
      name
      symbol
      id
    }
    outputToken {
      name
      id
      symbol
    }
  }
  marketHourlySnapshots {
    id
    blockNumber
    timestamp
    rates {
      rate
      side
      duration
    }
  }
}"""

query_uniswap= """query UniswapV3SwapTransactions {{
  swaps (
    where:{{
      and: [
        {{
          tokenIn_: {{
            symbol: {token1}
          }}
        }}
        {{
          tokenOut_: {{
            symbol: {token2}
          }}
        }}
        {{
          blockNumber_gt: 17742547
        }}
      ]
    }}
  ) {{
      timestamp
      blockNumber
      hash
      logIndex
      tokenIn {{
        symbol
      }}
      tokenOut {{
        symbol
      }}
      amountOut
      amountOutUSD
      amountIn
      amountInUSD
  }}
}}"""

# graphs =['uniswap-v3', 'pancakeswap-v3', 'sushiswap', 'trader-joe']
# print('graph', 'sushiswap')
# def flatten_json(y):
#     out = {}

#     def flatten(x, name=''):
#         if type(x) is dict:
#             for a in x:
#                 flatten(x[a], name + a + '_')
#         elif type(x) is list:
#             i = 0
#             for a in x:
#                 flatten(a, name + str(i) + '_')
#                 i += 1
#         else:
#             out[name[:-1]] = x

#     flatten(y)
#     return out


# #read in queries
# queries_file = open("backend/services/graph/queries.txt", "r")
# queries = queries_file.read()
# def get_pool_ids(address_list):
#     pull_pools_query=queries['pull_pools']
#     all_results =[]
#     for token1, token2 in address_list:
#         query = pull_pools_query.replace("{token1}", token1).replace("{token2}", token2)
#         # print('final query sending in: ', query)
#         result = graph_service.query_thegraph(query)
#         if result:
#             all_results.append(result)
#         # print('result', result)
#         # print()

#     def unnest_to_ids(array):
#         ids = []
#         for sub_array in array:
#             for item in sub_array:
#                 ids.append(item['id'])
#         return ids
#     ids=unnest_to_ids(all_results)
#     return ids
# pool_ids = get_pool_ids(address_list)
# print(pool_ids)
# swaps_query=queries['swaps']

# def pull_data_for_pools(token1, token2, query):
#     query = query.replace("{token1}", token1).replace("{token2}", token2)
#     result = graph_service.query_thegraph(query)

protocol = 'pancakeswap-v3'
graph_service = GraphService(protocol = 'pancakeswap-v3', chain='ethereum')
print('after graph_service')

swap_data_query=queries['swap_data']
print('swap_data_query', swap_data_query)
#using
token_pairs = [("BUSD", "DAI"),

("BUSD", "USDC"),

("BUSD", "USDT"),

("BUSD", "RETH"),

("BUSD", "WSTETH"),

("BUSD", "cbETH"),

("BUSD", "WETH"),

("BUSD", "MATIC"),

("BUSD", "WBTC"),

("DAI", "USDC"),

("DAI", "USDT"),

("DAI", "RETH"),

("DAI", "WSTETH"),

("DAI", "cbETH"),

("DAI", "WETH"),

("DAI", "MATIC"),

("DAI", "WBTC"),

("USDC", "USDT"),

("USDC", "RETH"),

("USDC", "WSTETH"),

("USDC", "cbETH"),

("USDC", "WETH"),

("USDC", "MATIC"),

("USDC", "WBTC"),

("USDT", "RETH"),

("USDT", "WSTETH"),

("USDT", "cbETH"),

("USDT", "WETH"),

("USDT", "MATIC"),

("USDT", "WBTC"),

("RETH", "WSTETH"),

("RETH", "cbETH"),

("RETH", "WETH"),

("RETH", "MATIC"),

("RETH", "WBTC"),

("WSTETH", "cbETH"),

("WSTETH", "WETH"),

("WSTETH", "MATIC"),

("WSTETH", "WBTC"),

("cbETH", "WETH"),

("cbETH", "MATIC"),

("cbETH", "WBTC"),

("WETH", "MATIC"),

("WETH", "WBTC"),

("MATIC", "WBTC")]








query_template = """
query UniswapV3SwapTransactions {
  swaps (
    where:{
      and: [
        {
          tokenIn_: {
            symbol: "%s"
          }
        }
        {
          tokenOut_: {
            symbol: "%s"
          }
        }
        {
          blockNumber_gt: 17742547
        }
      ]
    }
  ) {
      timestamp
      blockNumber
      hash
      logIndex
      tokenIn {
        symbol
      }
      tokenOut {
        symbol
      }
      amountOut
      amountOutUSD
      amountIn
      amountInUSD
  }
}
"""

insert_query = """
    INSERT INTO raw_graph_data_uniswap 
    (timestamp, blocknumber, hash, logindex, tokenin_symbol, tokenout_symbol, amountout, amountoutusd, amountin, amountinusd)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

# Convert the DataFrame to a list of tuples to use with the SQL query

# Iterate through the token pairs
for token1, token2 in token_pairs:
    # Format the query with the current token pair
    query = query_template % (token1, token2)
    
    # Send the request
    graph_service = GraphService(protocol = 'f-v3', chain='ethereum')
    result = graph_service.query_thegraph(query)
    result = pd.DataFrame(result)
    result.columns = result.columns.str.lower()
    # print('result.cols', result.columns)
    # print('result data from graph', result)
    result['source']='pancakeswap-v3'
    data_to_insert = [
    (
        row['timestamp'], 
        row['blocknumber'], 
        row['hash'], 
        row['logindex'], 
        row['tokenin']['symbol'], 
        row['tokenout']['symbol'], 
        row['amountout'], 
        row['amountoutusd'], 
        row['amountin'], 
        row['amountinusd']
    )
    for index, row in result.iterrows()
]
    # print('data_to_insert',data_to_insert)
    
    data_to_send = DbService.insert_data(result, 'raw_graph_data_pancakeswap', dex_table_structure)

    # response = requests.post(url, json={'query': query})

# for token1, token2 in zip(tokens):
#         print('token1', token1)
#         print('token2: ', token2)
#         # print('pull_pools_query', pull_pools_query)
    
# result = graph_service.query_thegraph(swap_data_query)
# # print('result.type', isinstance(result, list))
# df=pd.DataFrame(result)
# df.rename(columns={'id': 'contractAddress'}, inplace=True)
# # #add column for where data is from 
# df['source']=protocol
# print('db', df)
# data_to_send = DbService.insert_data(df, 'raw_graph_data_uniswap',dex_table_structure)

# # print()






# ### junk below
# # graph_service = GraphService(protocol = 'uniswap-v3', chain='ethereum')
# # result = graph_service.query_thegraph(query_liquidity)
# # print()

# # for graph in graphs:
# #     print('graph', graph)
# #     graph_service = GraphService(protocol = 'graph', chain='ethereum')
# #     print('after graph_service')
# #     result = graph_service.query_thegraph(query_liquidity)
#     print()
#     # print(result)
#     print("graph name: ", graph )
#     print()

