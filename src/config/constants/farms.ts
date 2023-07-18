import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'PSB',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      369: '0xCFDAeCeeF1Da66eC26Cfb5BE1ef3a5b70BD6e37C',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  } 
  ,
  {
    pid: 1,
    lpSymbol: 'PSB-PLS LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      369: '0x4eD3E2D7A54dEd78025f41083585c1C1483CAC43',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  }
 

  ,
  {
    pid: 2,
    lpSymbol: 'DAI-PLS LP',
    lpAddresses: {
      97: '',
      369: '0xC9e4bA7aE6Be2a209EE6F727EE2C4483Ff634daf',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  }
  ,
  {
    pid: 4,
    lpSymbol: 'PSB-DAI LP',
    lpAddresses: {
      97: '',
      369: '0xc0bc6f948386e57711bce7b66e70f746cef8d5af',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
  }
  ,
  {
    pid: 5,
    lpSymbol: 'PSB-PLSX LP',
    lpAddresses: {
      97: '',
      369: '0xc854b0aeda17e3ccf3d9e3d8da45dfd7ae7d42aa',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.pulsex,
  }
  
]

export default farms
