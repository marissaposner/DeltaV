# Delta V
## Delta V is the first, truly actionable data layer. In minutes, you can launch customized on-chain data streams and automated, on-chain actions. 
We allow developers and administrators to take back control of their data and their user base by launching customized on-chain data streams and setting up if, then workflows for on-chain actions that will allow them to always stay 1 step ahead. 

Our official submission for ETH Global Paris Hackathon


Setup:
We created a submodule in our github repo to automatically update with the Messari Subgraphs (https://github.com/messari/subgraphs). We chose these subgraphs because they have a more standardized schema than other subgraphs and were easier to build an abstraction layer on top of them.


# Running the backend
- Install Python version management tool: [pyenv](https://github.com/pyenv/pyenv) or [asdf](https://github.com/asdf-vm/asdf)
- Install `Python 3.9.14` using the Python version management tool and activate that version
- Setup the backend, ensure you have python 3.9 or greater installed
- `git submodule update --init --recursive` to clone (or update) the `subgraphs` repo in `backend/`
- `cd backend` and run the following steps:
  - run export PYTHONPATH='.'
  - pip install psycopg2-binary
  - run `pip install -r requirements.txt` (Install app requirements)
  - run `pip install -e .` (Install the 'backend' package)
  - connect to the db by adding a database.ini file in this format:

        [postgresql]
        host=localhost
        database=mydatabase
        user=myuser
        password=mypassword
        port=myport

    
  - Setup .env by copying .env.example to .env and seed with correct data
- Visit http://localhost:5000
