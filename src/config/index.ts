import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const PLS_BLOCK_TIME = 10

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://scan.pulsechain.com',
  [ChainId.TESTNET]: 'https://testnet.explorer.ariettachain.tech',
}

// PSB_PER_BLOCK details
// 40 PSB is minted per block
// 20 PSB per block is sent to Burn pool (A farm just for burning cake)
// 10 PSB per block goes to PSB syrup pool
// 9 PSB per block goes to Yield farms and lottery
// PSB_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// PSB/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const PSB_PER_BLOCK = 2500
export const BLOCKS_PER_YEAR = (60 / PLS_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const PSB_PER_YEAR = PSB_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://shibshift.com'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 1000000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
// In reality its 10000 because of fast refresh, a bit less here to cover for possible long request times
export const PANPSB_BUNNIES_UPDATE_FREQUENCY = 8000
