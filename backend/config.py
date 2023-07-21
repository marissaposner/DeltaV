"""Default configuration

Use env var to override
"""
import os

from dotenv import load_dotenv


load_dotenv()
GRAPH_API_KEY = os.getenv("GRAPH_API_KEY")
