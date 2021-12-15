import { ethers } from "ethers";
import { useState } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import { WalletNotConnectedError } from "./errors";
import AirdropContractNetworks from "contract/networks/SingularityAirdrop.json";
import AirdropContractABI from "contract/abi/SingularityAirdrop.json";
import { splitSignature } from "@ethersproject/bytes";
import { getGasPrice } from "./ethereum";
import { TransactionResponse } from "@ethersproject/abstract-provider";

export const useAirdropContract = (contractAddress: string) => {
  console.log("Contract Address", contractAddress);
  //   const [details, setDetails] = useState();
  const { account, library } = useActiveWeb3React();

  const claim = async (
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
  };
};
