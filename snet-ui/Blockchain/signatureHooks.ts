import { solidityKeccak256, hashMessage } from 'ethers/lib/utils';
import { WalletNotConnectedError } from 'utils/errors';
import { useActiveWeb3React } from './web3Hooks';

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<string> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const message = solidityKeccak256(types, values);
    const signer = await library.getSigner();
    const balance = await signer.getBalance();
    console.log(balance.toString());
    const hashedMessage = hashMessage(message);
    const signature = await signer.signMessage(hashedMessage);
    console.log('useEthSign:signature', signature);
    return signature;
  };

  return {
    sign,
  };
};
