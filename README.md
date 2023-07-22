# Delta V
ETH Global Paris Hackathon Project


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
  - Setup .env by copying .env.example to .env and seed with correct data
  - Setup the database with `flask db upgrade`
  - Start the backend app with `flask run`
- Visit http://localhost:5000
