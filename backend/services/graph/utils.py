import csv
from backend.services.graph.address_pairs import get_address_pairs, get_token_pairs


def list_to_csv(data_list, filename):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data_list)

# address_list = get_address_pairs()
token_list=['BUSD', 'DAI']

list_to_csv(token_list, 'backend/services/graph/token_list.csv')


