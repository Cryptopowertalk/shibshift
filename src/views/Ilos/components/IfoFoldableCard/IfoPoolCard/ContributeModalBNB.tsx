import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Modal, ModalBody, Text, Image, Button, BalanceInput, Flex } from '@pancakeswap/uikit'
import { PoolIds, Ifo } from 'config/constants/types'
import { WalletIfoData, PublicIfoData3 } from 'views/Ilos/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount, getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance'
import { getAddress, getIfoV4Address } from 'utils/addressHelpers'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useERC20, useIfoV4Contract, useWrappedPLS } from 'hooks/useContract'
import { BIG_NINE, BIG_TEN } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { getContract } from 'utils'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import useToast from 'hooks/useToast'

interface Props {
  publicIfoData: PublicIfoData3
  onSuccess: (amount: BigNumber) => void
  onDismiss?: () => void
}

const multiplierValues = [0.1, 0.25, 0.5, 0.75, 1]

// Default value for transaction setting, tweak based on PLS network congestion.
const gasPrice = BIG_TEN.times(BIG_TEN.pow(BIG_NINE)).toString()

const ContributeModalBNB: React.FC<Props> = ({
  publicIfoData,
  onDismiss,
  onSuccess,
}) => {

  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const { balance: userCurrencyBalance } = useGetBnbBalance()
  const { toastError, toastSuccess } = useToast()
  console.log(userCurrencyBalance)
  const contract=useIfoV4Contract(getIfoV4Address());
  const { t } = useTranslation()
  const valueWithTokenDecimals = new BigNumber(value).times(DEFAULT_TOKEN_DECIMAL)
  const [isEnable, setIsEnabled] = useState(false)

  return (
    <Modal title={t('', { })} onDismiss={onDismiss}>
      <ModalBody maxWidth="350px">
        
        
        <BalanceInput
          value={value}
          onUserInput={async e=>{
            setValue(e);
          //  setIsDisable(new BigNumber(userCurrencyBalance.toString()).gt(getDecimalAmount(new BigNumber(e),18).toString()));
          setIsEnabled(getDecimalAmount(new BigNumber(e),18).gte(publicIfoData.costPresaleBNB)&&new BigNumber(userCurrencyBalance.toString()).gte(publicIfoData.costPresaleBNB)&&getDecimalAmount(new BigNumber(e),18).lt(userCurrencyBalance.toString()));
                     
          
            
          }}
          mb="8px"
        />
        <Text color="textSubtle" textAlign="right" fontSize="12px" mb="16px">
          {t('Balance: ')+getFullDisplayBalance(new BigNumber(userCurrencyBalance.toString()), 18, 6)}
        </Text>
        <Flex justifyContent="space-between" mb="16px">
          {multiplierValues.map((multiplierValue, index) => (
            <Button
              key={multiplierValue}
              scale="xs"
              variant="tertiary"
              onClick={() => setValue((Number(getFullDisplayBalance(new BigNumber(userCurrencyBalance.toString()), 18, 6))*multiplierValue).toString())}
              mr={index < multiplierValues.length - 1 ? '8px' : 0}
            >
              {multiplierValue * 100}%
            </Button>
          ))}
        </Flex>
        <Text color="textSubtle" fontSize="12px" mb="24px">
          {t(
            'Enter PLS greater than or equal to the presale value',
          )}
        </Text>
        
        
        
        <Button
          
          disabled={!isEnable}
          onClick={async ()=>{
            try {
             
               const tx = await contract.buyBNB(getDecimalAmount(new BigNumber(value)).toString(),{value:getDecimalAmount(new BigNumber(value)).toString()});
              const receipt=await tx.wait()
              if (receipt.status) {
                toastSuccess(t('Token Recieved'), t('Token has been sent to your wallet.'))
                
                onDismiss()
              }
            } catch (error) {
              toastError(t('Error'), t('Presale is paused.'))
            
            }
          }}
        >Buy</Button>
        
      </ModalBody>
    </Modal>
  )
}

export default ContributeModalBNB