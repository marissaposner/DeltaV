import pandas as pd 
# Define your query template
pull_pools_query = """
query PullPoolIds {{
  liquidityPools(
    where: {{inputTokens_contains: ["{token1}", "{token2}"]}}
  ) {{
    id
  }}
}}
"""
address_list = pd.read_csv('backend/address_list.csv')


# Let's assume you have token1 and token2 variables
token1 = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
token2 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756csc2"
for token1, token2 in zip(address_list['token1'], address_list['token2']):
    # Perform the string substitution
    query = pull_pools_query.format(token1=token1, token2=token2)

# Print the final query
print('final query sending in: ', query)