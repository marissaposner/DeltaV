from backend.services.graph.address_pairs import get_address_pairs
from backend.services.graph.queries import queries
from backend.services.graph.service import GraphService
from backend.services.graph.subgraphs import SubgraphService
# from backend.services.graph.service import *
# 
import pandas as pd
address_list = pd.read_csv('backend/address_list.csv')

pull_deposits=queries['deposits']


for token1, token2 in zip(address_list['token1'], address_list['token2']):
        print('token1: ', token1)
        print('pull_pools_query', pull_deposits)
        query = pull_deposits.format(token1=token1, token2=token2)
        