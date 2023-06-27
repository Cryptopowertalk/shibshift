export const getBaseNftFields = () => `
  tokenId
  metadataUrl
  currentAskPrice
  currentSeller
  latestTradedPriceInPLS
  tradeVolumePLS
  totalTrades
  isTradable
  updatedAt
  otherId
  collection {
    id
  }
`

export const getBaseTransactionFields = () => `
  id
  block
  timestamp
  askPrice
  netPrice
  withPLS
  buyer {
    id
  }
  seller {
    id
  }
`

export const getCollectionBaseFields = () => `
  id
  name
  symbol
  active
  totalTrades
  totalVolumePLS
  numberTokensListed
  creatorAddress
  tradingFee
  creatorFee
  whitelistChecker
`
