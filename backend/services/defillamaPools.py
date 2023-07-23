import requests
import pandas as pd
#from datetime import datetime, timedelta

def get_defillama_data():
    
    base_url = "https://yields.llama.fi/pools"
    
    response = requests.get(base_url)
    if response.status_code == 200:
        data = response.json()
        print(data)
        return data
    else:
        raise Exception(f"Failed to fetch data. Status Code: {response.status_code}")
    

def filter_by_project_and_chain(data, project_name, chain_name):
    """
    Filter the data list of dictionaries by the 'project' and 'chain' fields.

    Parameters:
        data (list): List of dictionaries containing the data.
        project_name (str): The project name to filter by.
        chain_name (str): The chain name to filter by.

    Returns:
        list: List of dictionaries that match the specified project and chain names.
    """
    filtered_data = []
    for item in data:
        if item['project'] == project_name and item['chain'] == chain_name:
            filtered_data.append(item)
    return filtered_data


    


defi_llama_data = get_defillama_data()



project_name_to_filter = "sushi"
chain_name_to_filter = "Ethereum"
filtered_data = filter_by_project_and_chain(defi_llama_data, project_name_to_filter, chain_name_to_filter)
print(filtered_data)
