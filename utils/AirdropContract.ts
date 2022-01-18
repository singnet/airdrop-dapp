import { ethers } from 'ethers';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import { WalletNotConnectedError } from './errors';
import AirdropContractABI from 'contract/airdrop-contract/abi/SingularityAirdrop.json';
import { splitSignature } from '@ethersproject/bytes';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const useAirdropContract = () => {
  const { account, library } = useActiveWeb3React();

  const stake = async (
    contractAddress: string,
    tokenAddress: string,
    stakingAddress: string,
    totalEligibleAmount: string,
    airdropAmount: string,
    stakeAmount: string,
    airdropId: string,
    airdropWindowId: string,
    signature: string
  ) => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    if (!contractAddress) {
      throw new Error('Missing Contract Address');
    }

    if (!contractAddress) {
      throw new Error('Missing Contract Address');
    }

    const signer = await library.getSigner(account);
    const airdropContract = new ethers.Contract(contractAddress, AirdropContractABI, signer);

    const signatureParts = splitSignature(signature);
    console.log("75643564363473453456342378564387956906736546456235345", BigInt("75643564363473453456342378564387956906736546456235345"));
    const args = [
      stakingAddress,
      tokenAddress,
      BigInt(totalEligibleAmount),
      BigInt(airdropAmount),
      BigInt(stakeAmount),
      BigInt(airdropId),
      BigInt(airdropWindowId),
      signatureParts.v,
      signatureParts.r,
      signatureParts.s,
    ];

    console.log('ClaimAndStake ARGS: ', args);

    const gasPrice = await airdropContract.provider.getGasPrice();
    console.log('gasPrice', gasPrice);
    const gasLimit = await airdropContract.estimateGas.claimAndStake(...args);
    console.log('estimated gas limit', gasLimit);
    const txn = await airdropContract.claimAndStake(...args, {
      gasLimit: gasLimit,
      gasPrice,
    });
    console.log('Stake txn submitted', txn.hash);
    return txn;
  };

  const claim = async (
    contractAddress: string,
    tokenAddress: string,
    totalEligibleAmount: string,
    claimAmount: string,
    airdropId: string,
    airdropWindowId: string,
    signature: string
  ): Promise<TransactionResponse> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    if (!contractAddress) {
      throw new Error('Missing Contract Address');
    }
    console.log('tokeAddress', tokenAddress);
    console.log('totalEligibleAmount', totalEligibleAmount);
    console.log('claimAmount', claimAmount);
    console.log('airdropId', airdropId);
    console.log('airdropWindowId', airdropWindowId);
    console.log('signature', signature);
    const signer = await library.getSigner(account);
    const airdropContract = new ethers.Contract(contractAddress, AirdropContractABI, signer);

    const signatureParts = splitSignature(signature);

    const args = [
      tokenAddress,
      BigInt(totalEligibleAmount),
      BigInt(claimAmount),
      BigInt(airdropId),
      BigInt(airdropWindowId),
      signatureParts.v,
      signatureParts.r,
      signatureParts.s,
    ];
    console.log('Claim ARGS: ', args);

    const gasPrice = await airdropContract.provider.getGasPrice();
    console.log('gasPrice', gasPrice);
    const gasLimit = await airdropContract.estimateGas.claim(...args);
    console.log('estimated gas limit', gasLimit);
    const txn = await airdropContract.claim(...args, {
      gasLimit: gasLimit,
      gasPrice,
    });
    console.log('Claim txn submitted', txn.hash);
    return txn;
  };

  return {
    claim,
    stake,
  };
};
