import { WalletNotConnectedError } from 'utils/errors';
import { useActiveWeb3React } from './web3Hooks';

export const useEthSign = () => {
  const { account, library } = useActiveWeb3React();

  const sign = async (types: string[], values: Array<string | number>): Promise<any> => {
    if (!account || !library) {
      throw new WalletNotConnectedError();
    }

    const signer = await library.getSigner();

    const chainId = await signer.getChainId();
    const blockNumber = await library.getBlockNumber();

    const [airdropId, airdropWindowId] = values;

    const domain = {
      name: 'Nunet Airdrop',
      version: '1',
      chainId,
    };

    const valueType = {
      AirdropSignatureTypes: [
        { name: 'airdropId', type: 'string' },
        { name: 'airdropWindowId', type: 'string' },
        { name: 'blockNumber', type: 'string' },
        { name: 'walletAddress', type: 'address' },
      ],
      Mail: [{ name: 'Airdrop', type: 'AirdropSignatureTypes' }],
    };

    const value = {
      Airdrop: {
        airdropId: airdropId.toString(),
        airdropWindowId: airdropWindowId.toString(),
        blockNumber: blockNumber.toString(),
        walletAddress: account,
      },
    };

    const signature = await signer._signTypedData(domain, valueType, value);
    console.log('useEthSign:signature', signature);
    return { signature, blockNumber };
  };

  return {
    sign,
  };
};
