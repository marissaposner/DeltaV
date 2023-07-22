import sqlalchemy
import psycopg2
import psycopg2.extras
import os
from ..database import config

#pull in config params
conn = config.make_conn()
# conn = psycopg2.connect(config)
cursor = conn.cursor()
def insert_row_data(data_to_insert):
    keys = ', '.join([f'"{k}"' for k in data_to_insert.keys()])
    values = ', '.join([f"to_timestamp({v})" if isinstance(v, int) else f"'{v}'" for v in data_to_insert.values()])

    insert_statement = f"""
    INSERT INTO raw_graph_data_sushiswap ({keys})
    VALUES ({values})
    """
    # Execute the insert statement
    cursor.execute(insert_statement, values)
    # Commit the transaction
    conn.commit()
    # Close the connection
    # cursor.close()
    # conn.close()
class DbService:
    def __init__(self, data_to_insert):
        print('self', self)
        print('data to insert', data_to_insert)
        self.data_to_insert = data_to_insert
   
    def insert_data(dataframe):
        print('dataframe', dataframe)
        for index, row in dataframe.iterrows():
            insert_row_data(row.to_dict())


# try:
#     # Connect to your postgres DB
#     conn = psycopg2.connect(
#     host="ec2-34-236-103-63.compute-1.amazonaws.com",
#     database="de6fivvflf7sf",
#     user="qloqsgmvcfutor",
#     password="9e750e4e8dedda2d80053c384c74c58e4ed00995c68cb1ba401cd13d1843e0b9")
#     cur = conn.cursor()

#     # Execute a query
#     cur.execute("""CREATE TABLE raw_graph_data_sushiswap (
#     id SERIAL PRIMARY KEY,
#     createdTimestamp VARCHAR(255),
#     createdBlockNumber TEXT,
#     name TEXT,
#     symbol TEXT,
#     totalValueLockedUSD INT,
#     cumulativeVolumeUSD INT,
#     contract_address VARCHAR(255)
# );""")
#     conn.commit()

#     # Retrieve the column names
#     # colnames = [desc[0] for desc in cur.description]

#     # print(colnames)

# except (Exception, psycopg2.DatabaseError) as error:
#     print(error)
# finally:
#     if conn is not None:
#         cur.close()
#         conn.close()