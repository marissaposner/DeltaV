import sqlalchemy
import psycopg2
import psycopg2.extras
import os
# import sys
# print('path', sys.path)
from ..database import config
# import config

#pull in config params
conn = config.make_conn()
# conn = psycopg2.connect(config)
cursor = conn.cursor()
def insert_row_data(data_to_insert, table, table_structure):
    keys = ', '.join([f'"{k}"' for k in data_to_insert.keys()])
    # print('keys', keys)

    values = ', '.join([f"to_timestamp({v})" if isinstance(v, int)
                        else f"'{v}'" if not isinstance(v, dict)
                        else f"'{v['symbol']}'" if 'symbol' in v 
                        else 'NULL' 
                        for v in data_to_insert.values()])


    # print('table: ', table)
    # print('table_structure', table_structure)
    # print()
    create_table_statement = f"""
    CREATE TABLE IF NOT EXISTS {table}( {table_structure})
    """
    cursor.execute(create_table_statement)
    insert_statement = f"""
    INSERT INTO {table} ({keys})
    VALUES ({values})
    """

    print('insert statement', insert_statement)
    # Execute the insert statement
    cursor.execute(insert_statement)
    # Commit the transaction
    conn.commit()
    # Close the connection
    # cursor.close()
    # conn.close()
class DbService:
    
    def __init__(self, data_to_insert, table,table_structure):
        # print('self', self)
        # print('data to insert', data_to_insert)
        self.data_to_insert = data_to_insert
        self.table = table
        self.table_structure = table_structure
   
    def insert_data(dataframe, table, table_structure):
        # print('dataframe', dataframe)
        # dataframe.columns = map(str.lower, dataframe.columns)

        for index, row in dataframe.iterrows():
            
            #   print('index', index)
            #   print('row', row)
              insert_row_data(row.to_dict(),table,table_structure)
# try:
#     # Connect to your postgres DB
#     conn = config.make_conn()
#     # conn = psycopg2.connect(config)
#     cur = conn.cursor()

#     # Execute a query
#     cur.execute("""CREATE TABLE raw_graph_data_dex(
#     id SERIAL PRIMARY KEY,
#     createdTimestamp VARCHAR(255),
#     createdBlockNumber TEXT,
#     name TEXT,
#     symbol TEXT,
#     totalValueLockedUSD VARCHAR(255),
#     cumulativeVolumeUSD VARCHAR(255),
#     contractAddress VARCHAR(255),
#     source VARCHAR(255)
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