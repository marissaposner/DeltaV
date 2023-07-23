import os
import psycopg2
import json
import uuid
from sqlalchemy import create_engine

from configparser import ConfigParser
import pandas as pd
conn = psycopg2.connect(database="de6fivvflf7sf", user="qloqsgmvcfutor", password="9e750e4e8dedda2d80053c384c74c58e4ed00995c68cb1ba401cd13d1843e0b9", host="ec2-34-236-103-63.compute-1.amazonaws.com", port="5432")
 #Create a cursor object
cur = conn.cursor()

# Execute the query
cur.execute("""
    SELECT blocknumber, timestamp, SUM(CAST(amountinusd AS DECIMAL)) as total_amount, source, name, tokenin, tokenout
    FROM 
        raw_graph_data_pancakeswap
    GROUP BY blocknumber, timestamp, source, name, tokenin, tokenout
    ORDER BY blocknumber
""")

# Fetch all rows
rows = cur.fetchall()
print('rows', rows)
# Now we will process the rows and transform to the desired output format
output = []
for row in rows:
    output.append({
        'id': str(uuid.uuid4()), 
        'block': row[0],
        'timestamp': row[1],
        'value': float(row[2]),
        'source_name_enum': "SUBGRAPH",
        'product_name_enum': 'PANCAKESWAP',
        'field_name_enum': 'SUM_SWAPS_TOKEN_1',
        'token1': row[5], 
        'token2': row[6],
        'token3': None,
        'token4': None,
    })
  
json_data=json.dumps(output, indent=4)
data = json.loads(json_data)
# print('')
columns = ["id", "block", "timestamp","value", "source_name_enum", "product_name_enum", "field_name_enum", "token1", "token2", "token3", "token4"]
df = pd.DataFrame(data, columns=columns)
# print('df ', df)
# # Print output in json format


# df = pd.DataFrame(data)
# df['id'] = [str(uuid.uuid4()) for _ in range(len(df))]
engine = create_engine("postgresql://qloqsgmvcfutor:9e750e4e8dedda2d80053c384c74c58e4ed00995c68cb1ba401cd13d1843e0b9@ec2-34-236-103-63.compute-1.amazonaws.com:5432/de6fivvflf7sf")
print('after engine')
# send the DataFrame to a PostgreSQL table named 'my_table'
# df.to_sql("data_points", engine, if_exists='append')
def insert_row_data(df, table):
    # df['id'] = df['id'].apply(lambda x: str(uuid.uuid4()) if pd.isna(x) else x)
    for _, row in df.iterrows():
        data_to_insert = row.to_dict()
        keys = ', '.join([f'"{k}"' for k in data_to_insert.keys()])
        # print('keys', keys)

        values = ', '.join([f"to_timestamp({v})" if isinstance(v, int)
                            else f"'{v}'" if not isinstance(v, dict)
                            else f"'{v['symbol']}'" if 'symbol' in v 
                            else 'NULL' 
                            for v in data_to_insert.values()])
        # print('values', values)

        insert_statement = f"""
        INSERT INTO {table} ({keys})
        VALUES ({values})
        """

        # Execute the insert statement
        cur.execute(insert_statement)
        conn.commit()  # Commit your changes
insert_row_data(df, 'data_points')
