queries = {'swaps':"""
query UniswapV3SwapTransactions {
  liquidityPools(
    where: {
      and: [
        { inputTokens_: { symbol: "DAI" } }
        { inputTokens_: { symbol: "USDC" } }
        { swaps_: { blockNumber_gt: 17742547 } }
      ]
    }
  ) {
    id
    inputTokens {
      id
      symbol
      decimals
      name
    }
    swaps {
      timestamp
      blockNumber
      hash
      logIndex
      tokenIn {
        symbol
      }
      tokenOut {
        symbol
      }
      amountOut
      amountOutUSD
      amountIn
      amountInUSD
    }
  }
}
""",
'pull_pools': """query PullPoolIds {{
  liquidityPools(
    where: {{
      and: [
        {{ inputTokens_: {{ symbol: "{token1}" }} }}
        {{ inputTokens_: {{ symbol: "{token2}" }} }}
        {{ deposits_: {{ blockNumber_gt: 17742547 }} }}
      ]
    }}
  ) {{
    id
  }}
}}
""", 
'swaps': """query swaps {
  swaps(where: {timestamp_gt: "17743914", pool: "{pool}"}) {
    id
    timestamp
    blockNumber
    hash
    logIndex
    tokenIn {
      symbol
    }
    tokenOut {
      symbol
    }
    amountOut
    amountOutUSD
    amountIn
    amountInUSD
  }
}""",
'deposits':"""query UniswapV3DepositsTransactions {{
  liquidityPools(
    where: {{
      and: [
        inputTokens_contains: ["{token1}", "{token2}"]
        {{ deposits_: {{ blockNumber_gt: 17742547 }} }}
      ]
    }}
  ) {{
    id
    inputTokens {{
      id
      symbol
      decimals
      name
    }}
    deposits {{
      timestamp
      blockNumber
      hash
      logIndex
      inputTokenAmounts
      inputTokens {{
        symbol
      }}
    }}
  }}
}}
""", 
'swap_data':"""query UniswapV3SwapTransactions {{
  swaps (
    where:{{
      and: [
        {{
          tokenIn_: {{
            symbol: {token1}
          }}
        }}
        {{
          tokenOut_: {{
            symbol: {token2}
          }}
        }}
        {{
          blockNumber_gt: 17742547
        }}
      ]
    }}
  ) {{
      timestamp
      blockNumber
      hash
      logIndex
      tokenIn {{
        symbol
      }}
      tokenOut {{
        symbol
      }}
      amountOut
      amountOutUSD
      amountIn
      amountInUSD
  }}
}}"""
}