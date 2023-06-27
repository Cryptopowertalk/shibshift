import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useBlock } from 'state/block/hooks'
import useRefresh from 'hooks/useRefresh'
import IfoV4Abi from 'config/abi/ifoV4.json'
import { useIfoV4Contract } from 'hooks/useContract'
import { multicallv2 } from 'utils/multicall'
import { getIfoV4Address } from 'utils/addressHelpers'
// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431
// 1,000,000,000 / 100
const TAX_PRECISION = 10000000000



/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (): any => {
  const { fastRefresh } = useRefresh()

  const [state, setState] = useState({
    status: -2,
    costPresaleBNB:-2,
    listingPrice:-2,
    softcap:-2,
    hardcap:-2,
    sold:-2,
    decimals:-2,
    name:"",
    symbol:"",
    link:"",
    logolink:"",
    headerlogo:"",
    isWhitelistOn:false,
    users:-2,
    maxUserAmount:-2,
    startPresaleTime:-2,
    endPresaleTime:-2,
    paused:true,
    ILOToken:""
  })
  const { currentBlock } = useBlock()

 const address=getIfoV4Address();
  const fetchIfoData = useCallback(async () => {
    const ifoCalls = ['status',
    'costPresaleBNB',
    'listingPrice',
    'softcap',
    'hardcap',
    'sold',
    'decimals',
    'name',
    'symbol',
    'link',
    'logolink',
    'headerlogo',
    'isWhitelistOn',
    'users',
    'maxUserAmount',
    'startPresaleTime',
    'endPresaleTime',
    'paused',
    'ILOToken'].map((method) => ({
      address,
      name: method,
    }))

    const [status,
      costPresaleBNB,
      listingPrice,
      softcap,
      hardcap,
      sold,
      decimals,
      name,
      symbol,
      link,
      logolink,
      headerlogo,
      isWhitelistOn,
      users,
      maxUserAmount,
      startPresaleTime,
      endPresaleTime,
      paused,
      ILOToken  ] = await multicallv2(IfoV4Abi, ifoCalls)
      setState((prev) => ({
        status,
      costPresaleBNB,
      listingPrice,
      softcap,
      hardcap,
      sold,
      decimals,
      name,
      symbol,
      link,
      logolink,
      headerlogo,
      isWhitelistOn,
      users,
      maxUserAmount,
      startPresaleTime,
      endPresaleTime,
      paused,
      ILOToken 
      }))
  },[address])
    
  useEffect(() => {
    fetchIfoData()
  }, [fetchIfoData, fastRefresh])


 return {...state}
}

export default useGetPublicIfoData
