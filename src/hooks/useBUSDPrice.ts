import { ChainId, Currency, currencyEquals, JSBI, Price } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tokens, { mainnetTokens } from 'config/constants/tokens'
import { PairState, usePairs } from './usePairs'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const DAI_MAINNET = mainnetTokens.busd
const { wbnb: WPLS } = tokens

/**
 * Returns the price in DAI of the input currency
 * @param currency currency to compute the DAI price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WPLS, wrapped) ? undefined : currency, chainId ? WPLS : undefined],
      [wrapped?.equals(DAI_MAINNET) ? undefined : wrapped, chainId === ChainId.MAINNET ? DAI_MAINNET : undefined],
      [chainId ? WPLS : undefined, chainId === ChainId.MAINNET ? DAI_MAINNET : undefined],
    ],
    [chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WPLS)) {
      if (busdPair) {
        const price = busdPair.priceOf(WPLS)
        return new Price(currency, DAI_MAINNET, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(DAI_MAINNET)) {
      return new Price(DAI_MAINNET, DAI_MAINNET, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WPLS)
    const ethPairETHDAIValue: JSBI =
      ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WPLS).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (
      busdPairState === PairState.EXISTS &&
      busdPair &&
      busdPair.reserveOf(DAI_MAINNET).greaterThan(ethPairETHDAIValue)
    ) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, DAI_MAINNET, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(DAI_MAINNET).greaterThan('0') && ethPair.reserveOf(WPLS).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(DAI_MAINNET)
        const currencyEthPrice = ethPair.priceOf(WPLS)
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, DAI_MAINNET, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const cakeBusdPrice = useBUSDPrice(tokens.cake)
  return cakeBusdPrice
}

export const usePLSBusdPrice = (): Price | undefined => {
  const bnbBusdPrice = useBUSDPrice(tokens.wbnb)
  return bnbBusdPrice
}
