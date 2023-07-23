# Import the Subgrounds library
from subgrounds import Subgrounds
from dotenv import load_dotenv
import os

load_dotenv()
graph_api_key = os.getenv('GRAPH_API_KEY')

# Create a new Subgrounds object
sg = Subgrounds()

# Load the Uniswap v3 subgraph using a specific API endpoint
uni = sg.load_subgraph(f'https://gateway.thegraph.com/api/{graph_api_key}/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7')
# b2f94294e72881a7cdfe13eaba5709f4
# Query the financialsDailySnapshots endpoint with a specified order, limit, and filter criteria
latest_snapshots = uni.Query.financialsDailySnapshots(
  orderBy=uni.FinancialsDailySnapshot.timestamp,
  orderDirection='desc',
  first=1,
)

# Convert the query results to a Pandas dataframe and extract the first row
res = sg.query_df(latest_snapshots).squeeze()

# Print the result
res