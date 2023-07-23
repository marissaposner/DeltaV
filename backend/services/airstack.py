import requests

def query_milady_holders_ens_and_images(variables):
    url = "https://api.airstack.xyz/gql"  

    # Define the GraphQL query as a string
    query = '''
    query GetLastTenMiladyTransfersOnEthereum($_eq: Identity, $_eq1: Identity, $_in: [TokenType!], $blockchain: TokenBlockchain!, $limit: Int) {
      ethereumTransfers: TokenTransfers(
        input: {filter: {_or: [{from: {_eq: $_eq}}, {to: {_eq: $_eq1}}], tokenType: {_in: $_in}}, blockchain: $blockchain, limit: $limit}
      ) {
        TokenTransfer {
          amount
          blockNumber
          blockTimestamp
          from {
            addresses
          }
          to {
            addresses
          }
          tokenAddress
          transactionHash
          tokenId
          tokenType
          blockchain
        }
      }
    }
    '''

    # Prepare the headers and payload for the request
    headers = {
        "Content-Type": "application/json",
        "Authorization": "289a3de1f7de4497954951985e063ee2"  # If required by the API
    }
    payload = {
        "query": query,
        "variables": variables,
    }

    # Make the request to the GraphQL API
    response = requests.post(url, json=payload, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        print("Request failed with status code {}".format(response.status_code))
        return None

def transform_milady(data):
    # Extract the relevant information from the data
    token_transfers = data.get('ethereumTransfers', {}).get('TokenTransfer', [])

    transformed_data = []
    for transfer in token_transfers:
        transformed_data.append({
            'id': transfer['transactionHash'],
            'block': int(transfer['blockNumber']),
            'timestamp': int(transfer['blockTimestamp']),
            'value': int(transfer['amount']),
            'source_name': 'AIRSTACK',
            'product_name': transfer['to']['addresses'][0],  # Assuming there is only one address in 'to' field
            'field_name': 'Addresses',
            'token_1': 'null',
            'token_2': 'null',
            'token_3': 'null',
            'token_4': 'null',
        }, )

    return transformed_data

variables = {
    "_eq": "milady.eth", 
    "_eq1": "milady.eth",  
    "_in": ["ERC1155", "ERC721"],  
    "blockchain": "ethereum", 
    "limit": 10  
}

result = query_milady_holders_ens_and_images(variables)
print(result)
transformed_data = transform_milady(result)
print(transformed_data)

    







