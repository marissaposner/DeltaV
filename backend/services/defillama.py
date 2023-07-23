import requests
import pandas as pd
from datetime import datetime, timedelta

def get_defillama_data(timestamp, coins):
    
    base_url = "https://coins.llama.fi/prices/historical/" + timestamp + "/" + coins
    
    response = requests.get(base_url)
    if response.status_code == 200:
        data = response.json()
        print(data)
        return data
    else:
        raise Exception(f"Failed to fetch data. Status Code: {response.status_code}")




def transform_historical_prices(data, coins):
    
    nested_data = data['coins'][coins]
    print(nested_data)

    transformed_data = [
        {
            'id': 'id',
            'block': int(nested_data['timestamp']),
            'value': int(nested_data['price']),
            'source_name': 'Defillama',
            'product_name': nested_data['symbol'], 
            

        }
    ]
    return transformed_data

def load_historical_prices_data(transformed_data, output_file):
    df = pd.DataFrame(transformed_data)
    df.to_csv(output_file, index=False)
    print(f"Data loaded to {output_file} successfully.")



def get_current_block_number(api_key):
    base_url = "https://api.etherscan.io/api"
    params = {
        "module": "proxy",
        "action": "eth_blockNumber",
        "apikey": api_key,
    }
    
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()

        print(data)

        if data["status"] == "1":
            block_number = int(data["result"], 16)  # Convert hex to decimal
            return block_number
        else:
            raise Exception("API returned an error: {}".format(data["message"]))
    else:
        raise Exception("Failed to fetch data. Status Code: {}".format(response.status_code))



def get_block_timestamp(api_key, block_number):
    base_url = "https://api.etherscan.io/api"
    endpoint = "/getBlockByNumber"
    params = {
        "module": "proxy",
        "action": "eth_getBlockByNumber",
        "tag": hex(block_number),  # Convert block number to hex
        "boolean": "true",
        "apikey": api_key,
    }

    response = requests.get(base_url + endpoint, params=params)

    if response.status_code == 200:
        data = response.json()
        if "result" in data and data["result"] is not None:
            timestamp_hex = data["result"]["timestamp"]
            timestamp = int(timestamp_hex, 16)
            return timestamp
        else:
            raise Exception("Block information not found.")
    else:
        raise Exception(f"Failed to fetch data. Status Code: {response.status_code}")


if __name__ == "__main__":
    coins = "ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    output_file = "coin_price_data.csv"
    etherscan_api_key = "XGAB34XXTPFHVT3XC195TX1UXX5Y76HG13"

    try:
        # Calculate the timestamp of the current block and the block 24 hours ago
        current_blocknumber = get_current_block_number(etherscan_api_key)
        # current_timestamp = get_block_timestamp(etherscan_api_key, current_blocknumber)
        # start_timestamp = current_timestamp - 24 * 3600

        # Calculate the number of blocks between start and current timestamp
        # block_interval = current_blocknumber - get_current_block_number(etherscan_api_key, start_timestamp)

        """for index in range(block_interval):
            current_blocknumber = get_current_block_number(etherscan_api_key) - index
            current_timestamp = get_block_timestamp(etherscan_api_key, current_blocknumber)
            defillama_data = get_defillama_data(str(current_timestamp), coins)

            # Transformation
            transformed_data = transform_historical_prices(defillama_data, coins)

            # Load
            load_historical_prices_data(transformed_data, output_file)"""

    except Exception as e:
        print("An error occurred:", e)








'''if __name__ == "__main__":
    coins = "ethereum:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    output_file = "coin_price_data.csv"
    etherscan_api_key = "XGAB34XXTPFHVT3XC195TX1UXX5Y76HG13"

    try:
        start_blocknumber = get_current_block_number(etherscan_api_key) - 7200
        print(start_blocknumber)
        num_iterations = 7200

        for index in range(num_iterations):
            current_blocknumber = start_blocknumber + index
            current_timestamp = get_block_timestamp(etherscan_api_key, current_blocknumber)
            defillama_data = get_defillama_data(str(current_timestamp), coins)

            # Transformation
            transformed_data = transform_historical_prices(defillama_data, coins)

            # Load
            load_historical_prices_data(transformed_data, output_file)

    except Exception as e:
        print("An error occurred:", e)'''








"""def get_block_number_from_timestamp(timestamp):
    base_url = "https://api.etherscan.io/api"
    api_key = "XGAB34XXTPFHVT3XC195TX1UXX5Y76HG13"  

    # Convert the timestamp to a formatted date
    date = datetime.utcfromtimestamp(int(timestamp)).strftime('%Y-%m-%d %H:%M:%S')

    # Get block number from timestamp using Etherscan API
    params = {
        "module": "block",
        "action": "getblocknobytime",
        "timestamp": date,
        "closest": "before",
        "apikey": api_key,
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "1":
            return int(data["result"])
        else:
            raise Exception(f"Failed to get block number from timestamp. Error: {data['message']}")
    else:
        raise Exception(f"Failed to fetch data from Etherscan API. Status Code: {response.status_code}")"""



'''def get_defillama_tvl_data(protocol):
    base_url = "https://api.llama.fi/protocol/" + protocol
    
    
    
    response = requests.get(base_url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception(f"Failed to fetch data. Status Code: {response.status_code}")'''










"""def transform_historical_tvl(data):
    transformed_data = [
        {
            'id': 'id',
            'block': data['chainTVLs']['tvl']['date'],
            'value': data['chainTVLs']['tvl']['totalLiquidityUSD'], #how do I nest the requests and store them into a list? 
            'source_name': 'Defillama',
            'product_name': data['name']
            

        }
    ]
    return transformed_data



def load_historical_tvl_data(transformed_data, output_file):
    df = pd.DataFrame(transformed_data)
    df.to_csv(output_file, index=False)
    print(f"Data loaded to {output_file} successfully.")"""




        #defillama_tvl_data = get_defillama_tvl_data(protocol)

        #transformed_tvl_data = transform_historical_tvl(defillama_tvl_data)

        #load_historical_tvl_data(transformed_tvl_data, output_file_tvl