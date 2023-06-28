import { useCallback } from 'react'
import ethers, { Contract, CallOverrides } from 'ethers'
import { useGasPrice } from 'state/user/hooks'
import { get } from 'lodash'
import useActiveWeb3React from './useActiveWeb3React'

/**
 * Perform a contract call with a gas price returned from useGasPrice
 * @param contract Used to perform the call
 * @param methodName The name of the method called
 * @param methodArgs An array of arguments to pass to the method
 * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export function useCallWithGasPrice() {
  
  const {library}=useActiveWeb3React();
  const callWithGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      overrides: CallOverrides = null,
    ): Promise<ethers.providers.TransactionResponse> => {
      const contractMethod = get(contract, methodName)
      const gasPrice = await library.getGasPrice()
console.log(gasPrice.toString())
      const tx = await contractMethod(
        ...methodArgs,
        { ...overrides }
      )

      return tx
    },
    [library],
  )

  return { callWithGasPrice }
}
