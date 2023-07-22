import requests
import json

url = "https://wild-aged-gas.discover.quiknode.pro/6312ca71423028fc37c9168a6e25e5ea0ca3aaee/"
# top_10_collection_pairs = ["bored_ape": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", "mutant_ape": "0x60E4d786628Fea6478F785A6d7e704777c86a7c6", "crypto-punks": "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "degods":"0x8821BeE2ba0dF28761AffF119D66390D594CD280", "pudgy_penguin": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8", "azuki": "0xED5AF388653567Af2F388E6224dC7C4b3241C544", "milady": "0x5Af0D9827E0c53E4799BB226655A1de152A425a5"]
top_10_collections = ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', '0x60E4d786628Fea6478F785A6d7e704777c86a7c6', '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', "0x8821BeE2ba0dF28761AffF119D66390D594CD280", "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8", "0xED5AF388653567Af2F388E6224dC7C4b3241C544", "0x5Af0D9827E0c53E4799BB226655A1de152A425a5"]
for collection in top_10_collections:

  payload = json.dumps({
    "id": 67,
    "jsonrpc": "2.0",
    "method": "qn_getTransfersByNFT",
    "params": {
      "collection": collection,
      "collectionTokenId": "1",
      "page": 1,
      "perPage": 10
    }
  })
  headers = {
    'Content-Type': 'application/json'
  }

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)


