import requests
import uuid
import pandas as pd
import psycopg2
from datetime import datetime
from backend.config import config
import sys
sys.path.append('../')

def extract_gas_price_data(api_key):
    base_url = "https://api.etherscan.io/api"
    print('extract_gas')
    params = {
        "module":"gastracker",
        "action":"gasoracle",
        "apikey": api_key
        
    }
    
    response = requests.get(base_url, params=params)
    print('response', response)
    if response.status_code == 200:
        data = response.json() 
        if data["status"] == "1":
            return data["result"]
        else:
            raise Exception("API returned an error: {}".format(data['message']))
    else:
        raise Exception("Failed to fetch data. Status Code: {}".format(response.status_code))


    

def transform_gas_price_data(data):
    transformed_data = [
        {
            'id':uuid.uuid4(),
            'source_name_enum': 'ETHERSCAN',
            'value': int(data['SafeGasPrice']),
            'timestamp': datetime.now().time(),
            'block': int(data['LastBlock']),
            'product_name_enum': 'GAS',
            'field_name_enum': 'GAS_PRICE',
            'token1': 'null',
            'token2': 'null',
            'token3': 'null',
            'token4': 'null',



        }
    ]
    return transformed_data

# def load_gas_price_data(transformed_data):
#     # Create a DataFrame from the transformed data
#     df = pd.DataFrame(transformed_data)

#     try:
#         # Connect to the PostgreSQL database
#         params = config()
#         conn = psycopg2.connect(**params)
#         cur = conn.cursor()

#         # Prepare the SQL query to insert data into the table
#         insert_query = """
#             INSERT INTO gas_price_data (
#                 source_name,
#                 value,
#                 timestamp,
#                 block,
#                 product_name,
#                 field_name,
#                 token_1,
#                 token_2,
#                 token_3,
#                 token_4
#             ) VALUES (
#                 %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
#             )
#         """

#         # Execute the query for each row in the DataFrame
#         for _, row in df.iterrows():
#             cur.execute(
#                 insert_query,
#                 (
#                     row['source_name_enum'],
#                     row['value'],
#                     row['timestamp'],
#                     row['block'],
#                     row['product_name_enum'],
#                     row['field_name_enum'],
#                     row['token_1'],
#                     row['token_2'],
#                     row['token_3'],
#                     row['token_4'],
#                 ),
#             )

#         # Commit the changes to the database
#         conn.commit()
#         print("Data loaded to the PostgreSQL database successfully.")

    # except (Exception, psycopg2.DatabaseError) as error:
    #     print("An error occurred:", error)

    # finally:
    #     if conn is not None:
    #         cur.close()
    #         conn.close()
    #         print("Database connection closed.")

if __name__ == "__main__":
    etherscan_api_key = "XGAB34XXTPFHVT3XC195TX1UXX5Y76HG13"
    output_file = "gas_price_data.csv"

    try:
        # Step 1: Extraction
        gas_price_data = extract_gas_price_data(etherscan_api_key)


        # Step 2: Transformation
        transformed_data = transform_gas_price_data(gas_price_data)
        

        # Step 3: Load
        # load_gas_price_data(transformed_data)

    except Exception as e:
        print("An error occurred:", e)

