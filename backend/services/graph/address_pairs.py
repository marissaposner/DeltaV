import pandas as pd
import numpy as np
import csv
import itertools
def get_address_pairs():
    with open("/Users/marissaposner/Connectr/backend/services/graph/tokens.csv",'r') as f:
        reader = csv.reader(f)
        headers = next(reader)
        data = [{h:x for (h,x) in zip(headers,row)} for row in reader]
        df = pd.DataFrame(data)
        # print('df', df)

    address_pairs = list(itertools.permutations(df['Address'], 2))
    for pair in address_pairs:
        address_1 = pair[0]
        address_2 = pair[1]
        # print(f"Pool for {address_1} and {address_2} is ...")

    # print(address_pairs)
    return address_pairs


def get_token_pairs():

    with open("/Users/marissaposner/Connectr/backend/services/graph/tokens.csv",'r') as f:
        reader = csv.reader(f)
        headers = next(reader)
        data = [{h:x for (h,x) in zip(headers,row)} for row in reader]
        df = pd.DataFrame(data)
        print('df ', df.columns)
        # print('df', df)

    token_pairs = list(itertools.permutations(df['Token'], 2))
    for pair in token_pairs:
        print('pair', pair)
        address_1 = pair[0]
        address_2 = pair[1]
        # print(f"Pool for {address_1} and {address_2} is ...")

    # print(address_pairs)
    return token_pairs


