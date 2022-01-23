import { solidityKeccak256, arrayify } from "ethers/lib/utils";
import { WalletNotConnectedError } from "utils/errors";
import { useActiveWeb3React } from "./web3Hooks";
import { Bytes, hexlify, hexValue, isHexString } from "@ethersproject/bytes";

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<string> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const message = solidityKeccak256(types, values);
    console.log("useEthSign:message", message);
    const bytesDataHash = arrayify(message);
    console.log("useEthSign:account", account);
    console.log("useEthSign:library", library);
    const signer = library.getSigner(account);
    console.log("useEthSign:signer", signer);
    console.log("useEthSign:bytesDataHash", bytesDataHash);
    console.log("useEthSign:hexlify(bytesDataHash)",hexlify(bytesDataHash));
    console.log("useEthSign:(hexlify(hexlify(bytesDataHash)", hexlify(hexlify(bytesDataHash)));
    const signature = await signer.signMessage(hexlify(hexlify(bytesDataHash)));
    console.log("Signature without hexlify :", signer.signMessage(bytesDataHash));
    console.log("Signature with    hexlify :", signer.signMessage(hexlify(bytesDataHash)));
    console.log("Signature with    hexlify(hexlify) :", signer.signMessage(hexlify(hexlify(bytesDataHash))));

    console.log("useEthSign:signature", signature);
    return signature;
  };

  return {
    sign,
  };
};
