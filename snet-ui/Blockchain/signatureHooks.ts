import { solidityKeccak256, arrayify } from "ethers/lib/utils";
import { WalletNotConnectedError } from "utils/errors";
import { useActiveWeb3React } from "./web3Hooks";

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<string> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const message = solidityKeccak256(types, values);
    const bytesDataHash = arrayify(message);
    console.log("useEthSign:account", account);
    console.log("useEthSign:library", library);
    const signer = library.getSigner(account);
    console.log("useEthSign:signer", signer);
    console.log("useEthSign:signer", bytesDataHash);
    const signature = await signer.signMessage(bytesDataHash);
    console.log("useEthSign:signature", signature);
    return signature;
  };

  return {
    sign,
  };
};
