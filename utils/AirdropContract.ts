import { ethers } from "ethers";
import { useState } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import { WalletNotConnectedError } from "./errors";
import AirdropContractNetworks from "contract/occam-contract/networks/SingularityAirdrop.json";
import AirdropContractABI from "contract/occam-contract/abi/SingularityAirdrop.json";
import { splitSignature } from "@ethersproject/bytes";
import { getGasPrice } from "./ethereum";
import { TransactionResponse } from "@ethersproject/abstract-provider";

export const useAirdropContract = () => {
  const { account, library } = useActiveWeb3React();

  const stake = async (
    contractAddress: string,
    tokenAddress: string,
    stakingAddress: string,
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
      throw new Error("Missing Contract Address");
    }

    if (!contractAddress) {
      throw new Error("Missing Contract Address");
    }

    const signer = await library.getSigner(account);
    const airdropContract = new ethers.Contract(
      contractAddress,
      AirdropContractABI,
      signer
    );

    const signatureParts = splitSignature(signature);

    const args = [
      stakingAddress,
      tokenAddress,
      Number(airdropAmount),
      Number(stakeAmount),
      Number(airdropId),
      Number(airdropWindowId),
      signatureParts.v,
      signatureParts.r,
      signatureParts.s,
    ];

    console.log("ClaimAndStake ARGS: ", args);

    const gasPrice = await getGasPrice();
    const gasLimit = await airdropContract.estimateGas.claimAndStake(...args);
    console.log("estimated gas limit", gasLimit);
    const txn = await airdropContract.claimAndStake(...args, {
      gasLimit: gasLimit,
      gasPrice,
    });
    console.log("Stake txn submitted", txn.hash);
    return txn;
  };

  const claim = async (
    contractAddress: string,
    tokenAddress: string,
    claimAmount: string,
    airdropId: string,
    airdropWindowId: string,
    signature: string
  ): Promise<TransactionResponse> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    if (!contractAddress) {
      throw new Error("Missing Contract Address");
    }

    const signer = await library.getSigner(account);
    const airdropContract = new ethers.Contract(
      contractAddress,
      AirdropContractABI,
      signer
    );

    const signatureParts = splitSignature(signature);

    const args = [
      tokenAddress,
      Number(claimAmount),
      Number(airdropId),
      Number(airdropWindowId),
      signatureParts.v,
      signatureParts.r,
      signatureParts.s,
    ];

    const gasPrice = await getGasPrice();
    const gasLimit = await airdropContract.estimateGas.claim(...args);
    console.log("estimated gas limit", gasLimit);
    const txn = await airdropContract.claim(...args, {
      gasLimit: gasLimit,
      gasPrice,
    });
    console.log("Claim txn submitted", txn.hash);
    return txn;
  };

  return {
    claim,
    stake,
  };
};
