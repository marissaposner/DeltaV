import datetime as dt
import json
import os

import pandas as pd
import requests
import sys
# from backend.services.graph.queries import queries
from backend.database.send_data import DbService
from backend.services.graph.subgraphs import SubgraphService
from backend.services.Etherscan import getGas
# print('result.type', isinstance(result, list))
# df=pd.DataFrame(result)
# df.rename(columns={'id': 'contractAddress'}, inplace=True)
# # #add column for where data is from 
# df['source']='etherscan'
# print('db', df)
# data_to_send = DbService.insert_data(df, 'raw_graph_data_uniswap',dex_table_structure)
etherscan_api_key = "XGAB34XXTPFHVT3XC195TX1UXX5Y76HG13"
output_file = "gas_price_data.csv"
table_structure="""id, source_name_enum,
    value,
    timestamp,
    block,
    product_name_enum,
    field_name_enum,
    token1,
    token2,
    token3,
    token4
    """
try:
    # Step 1: Extraction
    gas_price_data = getGas.extract_gas_price_data(etherscan_api_key)


    # Step 2: Transformation
    transformed_data = getGas.transform_gas_price_data(gas_price_data)
    if isinstance(transformed_data, list):
        transformed_data = pd.DataFrame(transformed_data)

    print('transformed', transformed_data)
    data_to_send = DbService.insert_data(transformed_data, 'data_points', table_structure)

    # Step 3: Load

except Exception as e:
    print("An error occurred:", e)



