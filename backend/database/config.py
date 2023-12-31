"""Default configuration

Use env var to override
"""
import os
import psycopg2
from configparser import ConfigParser
import sys

print("path",os.getcwd())
def make_conn(filename='/Users/corneliaweinzierl/Connectr/backend/database/database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
    connection = psycopg2.connect(**db)
    return connection