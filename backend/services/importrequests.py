import requests

def query_token_transfers(variables):
    url = "https://api.airstack.xyz/gql"  

    # Define the GraphQL query as a string
    query = '''query GetTokenTransfersForContractAddress($_eq: Address, $_gte: Time, $_lt: Time, $blockchain: TokenBlockchain!) {
  ethereum: TokenTransfers(
    input: {filter: {tokenAddress: {_eq: $_eq}, blockTimestamp: {_gte: $_gte, _lt: $_lt}}, blockchain: $blockchain}
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





def sum_amount(data):
    # Extract the 'TokenTransfer' list from the data
    token_transfers = data.get('data', {}).get('ethereum', {}).get('TokenTransfer', [])

    # Initialize a variable to store the sum of 'amount'
    total_amount = 0

    # Iterate through each 'TokenTransfer' and add its 'amount' to the total
    for transfer in token_transfers:
        # Ensure the 'amount' is not an empty string before adding
        if transfer['amount']:
            total_amount += int(transfer['amount'])

    return total_amount


def count_transactions(data):
    # Extract the 'TokenTransfer' list from the data
    token_transfers = data.get('data', {}).get('ethereum', {}).get('TokenTransfer', [])

    # Get the total number of transactions
    num_transactions = len(token_transfers)

    return num_transactions



def transactions_per_block(data):
    # Extract the 'TokenTransfer' list from the data
    token_transfers = data.get('data', {}).get('ethereum', {}).get('TokenTransfer', [])

    # Initialize a dictionary to store the count of transactions per block
    transactions_per_block = {}

    # Count transactions for each block
    for transfer in token_transfers:
        block_number = transfer.get('blockNumber')
        if block_number:
            if block_number not in transactions_per_block:
                transactions_per_block[block_number] = 1
            else:
                transactions_per_block[block_number] += 1

    return transactions_per_block


def amount_sum_per_block(data):
    # Extract the 'TokenTransfer' list from the data
    token_transfers = data.get('data', {}).get('ethereum', {}).get('TokenTransfer', [])

    # Initialize a dictionary to store the sum of amounts per block
    amount_sum_per_block = {}

    # Sum amounts for each block
    for transfer in token_transfers:
        block_number = transfer.get('blockNumber')
        amount = transfer.get('amount')
        if block_number and amount:
            amount = int(amount)
            if block_number not in amount_sum_per_block:
                amount_sum_per_block[block_number] = amount
            else:
                amount_sum_per_block[block_number] += amount

    return amount_sum_per_block


variables = {
    "_eq": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",  
    "_gte": "2023-07-21T00:00:00.000Z",
    "_lt": "2023-07-22T00:00:00.000Z",  
    "blockchain": "ethereum",  
}

result = query_token_transfers(variables)
print(result)

# Calculate the sum of 'amount' from the given data
total_amount = sum_amount(result)
print('The amount is ' + str(total_amount)) # Output the total sum of 'amount'

total_transactions = count_transactions(result)
print(total_transactions)

transactions_per_block = transactions_per_block(result)
print(transactions_per_block)


# Calculate the sum of amounts per block from the given data
amount_sum_per_block = amount_sum_per_block(result)
print('Amount sum per block:')
for block_number, amount_sum in amount_sum_per_block.items():
    print(f'Block {block_number}: {amount_sum} total amount')



