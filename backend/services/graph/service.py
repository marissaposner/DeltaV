import datetime as dt
import json
import os

import pandas as pd
import requests
import sys

sys.path.append('../')

from backend.config import GRAPH_API_KEY
from backend.services.graph.subgraphs import SubgraphService
DEFAULT_PROTOCOL = "aave-forks"
DEFAULT_CHAIN = "ethereum"
from backend.database.send_data import DbService
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

# arbitrum_subgraphs =['JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk']
def execute_query_thegraph(subgraph_id, query, hosted=True):
    namespace = "messari"
    print(subgraph_id)
    
    if hosted:
        base_url = f"https://api.thegraph.com/subgraphs/name/{namespace}/"
        print('base_url', base_url)
    # if subgraph_id in arbitrum_subgraphs:
    #     print('in arbitrum subgraphs')
    #     base_url = f"https://gateway-arbitrum.network.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
    #     print('base_url', base_url)

    else:
        # base_url = f"https://gateway.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
        base_url = f"https://gateway-arbitrum.network.thegraph.com/api/{GRAPH_API_KEY}/subgraphs/id/"
        print('base_url', base_url)


    query_url = f"{base_url}{subgraph_id}"

    print('query_url',query_url)
    r = requests.post(query_url, json={"query": query})
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
        print('protocol', protocol)
        print('DEFAULT CHAIN', chain)
        # os.chdir('..')
        print("This is the path error",sys.path)
        self.build_subgraphs_json()
        print('after build_subgraphs_json')
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

        print("==========the graph response:==========\n", data)
        if data == None:
            raise ValueError()
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
        print('os.getcwdb()', os.getcwdb())
        print('whole path', os.getcwdb().decode("utf-8") + "/subgraphs/deployment/deployment.json")
        deployments = json.load(
            open(os.getcwdb().decode("utf-8") + "/subgraphs/deployment/deployment.json")
        )
        li = []
        for protocol in deployments:
            # for chain in CHAINS:
            print('in protocol')
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
        print(
            json_dump,
            file=open(
                os.path.join(
                    os.getcwdb().decode("utf-8"),
                    "backend/services/graph/",
                    "subgraphs.json",
                ),
                "w",
            ),
        )
        return df

print('adding path', os.getcwdb().decode("utf-8"))
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
protocol = 'sushiswap'
graph_service = GraphService(protocol = 'sushiswap', chain='ethereum')
print('after graph_service')
result = graph_service.query_thegraph(query_liquidity)
print('result.type', isinstance(result, list))
# for json_blob in result:
#     # Convert JSON blob to Python dictionary and flatten it
#     data_to_insert = flatten_json(json.loads(json_blob))
# data = json.loads(result)
# print('data: ')
# print()
df=pd.DataFrame(result)
print('df', df.columns)
df.rename(columns={'id': 'contractAddress'}, inplace=True)
#add column for where data is from 
df['source']=protocol

# df.to_csv('sample_sushiswap.csv')
data_to_send = DbService.insert_data(df, 'raw_graph_data_dex')
# data_to_send.insert_data(df)

print()
# graph_service = GraphService(protocol = 'uniswap-v3', chain='ethereum')
# print('after graph_service')
# result = graph_service.query_thegraph(query_liquidity)
# print()

# for graph in graphs:
#     print('graph', graph)
#     graph_service = GraphService(protocol = 'graph', chain='ethereum')
#     print('after graph_service')
#     result = graph_service.query_thegraph(query_liquidity)
#     print()
#     # print(result)
#     print("graph name: ", graph )
#     print()

