from backend.services.graph.address_pairs import get_address_pairs
from backend.services.graph.queries import queries
from backend.services.graph.service import GraphService
from backend.services.graph.subgraphs import SubgraphService
# from backend.services.graph.service import *
import pandas as pd
from utils import *

address_list = pd.read_csv('backend/address_list.csv')
print('address list', address_list)
# dexes =['uniswap-v3', 'pancakeswap-v3', 'sushiswap', 'curve-finance']
dexes =['uniswap-v3']

# lending = ['aave-v3', 'compound-v3', 'morpho']
# protocol = 'uniswap-v3'
# graph_service = GraphService(protocol = 'uniswap-v3', chain='ethereum')
def get_pool_ids(address_list, dex):
    print('START')
    print()
    print()

    pull_pools_query=queries['pull_pools']
    print('pull_pools_query',pull_pools_query)
    all_results =[]
    for token1, token2 in zip(address_list['token1'], address_list['token2']):
        print('token1: ', token1)
        print('pull_pools_query', pull_pools_query)
        query = pull_pools_query.format(token1=token1, token2=token2)

        print('final query sending in: ', query)
        try:
            print('protocol', dex)
            graph_service = GraphService(protocol = dex, chain='ethereum')
            result=graph_service.query_thegraph(query)
            print('result in try', result)
            all_results.append(result)
        except Exception as e:
            print(f"Error while processing query: {e}")
        # if result:
        #     all_results.append(result)
        # print('result', result)
        # print()

    def unnest_to_ids(array):
        ids = []
        for sub_array in array:
            for item in sub_array:
                ids.append(item['id'])
        return ids
    ids=unnest_to_ids(all_results)
    return ids

print('HERE')
for dex in dexes: 
    print('dex')
    pool_ids = get_pool_ids(address_list, dex)
    list_to_csv(pool_ids, 'backend/services/graph/{}_pool_ids.csv'.format(dex))

    # pool_ids.to_csv('backend/services/graph/{dex}pool_ids.csv')

# print(pool_ids)

