import { ethers } from 'ethers'

/**
 * Buy a NFT with PLS
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @returns transaction hash, or null
 */
export const buyTokenUsingPLS = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
): Promise<string> => {
  try {
    const tx = await contract.buyTokenUsingPLS(collectionAddress, tokenId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Buy a NFT with WPLS
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param price
 * @returns transaction hash, or null
 */
export const buyTokenUsingWPLS = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
  price: ethers.BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.buyTokenUsingWPLS(collectionAddress, tokenId, price)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * List a NFT for sale
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param askPrice
 * @returns transaction hash, or null
 */
export const createAskOrder = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
  askPrice: ethers.BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.createAskOrder(collectionAddress, tokenId, askPrice)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Update the price of a listed NFT
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @param newPrice
 * @returns transaction hash, or null
 */
export const modifyAskOrder = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
  newPrice: ethers.BigNumber,
): Promise<string> => {
  try {
    const tx = await contract.modifyAskOrder(collectionAddress, tokenId, newPrice)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Cancel a NFT sale listing. The caller needs to be the NFT owner.
 * @param contract
 * @param collectionAddress
 * @param tokenId
 * @returns transaction hash, or null
 */
export const cancelAskOrder = async (
  contract: ethers.Contract,
  collectionAddress: string,
  tokenId: number,
): Promise<string> => {
  try {
    const tx = await contract.cancelAskOrder(collectionAddress, tokenId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Get pending WPLS revenues for a user
 * @param contract
 * @param userAddress
 * @returns pending revenues, or null if failed
 */
export const getPendingRevenue = async (contract: ethers.Contract, userAddress: string): Promise<ethers.BigNumber> => {
  try {
    const res = await contract.pendingRevenue(userAddress)
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Claim WPLS pending revenues for a connected users
 * @param contract
 * @returns transaction hash, or null
 */
export const claimPendingRevenue = async (contract: ethers.Contract): Promise<string> => {
  try {
    const tx = await contract.claimPendingRevenue()
    const receipt = await tx.wait()
    return receipt.transactionHash
  } catch (error) {
    console.error(error)
    return null
  }
}
