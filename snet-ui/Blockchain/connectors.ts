import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { NetworkConnector } from "./NetworkConnector";

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  // KOVAN = 42,
}

// export enum NetworkName {
//   mainnet = SupportedChainId.MAINNET,
//   ropsten = SupportedChainId.ROPSTEN,
//   kovan = SupportedChainId.KOVAN,
// }

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  // SupportedChainId.KOVAN,
];

const INFURA_KEY =  process.env.NEXT_PUBLIC_INFURA_KEY || "";

if (typeof INFURA_KEY === "undefined") {
  throw new Error(`NEXT_PUBLIC_INFURA_KEY must be a defined environment variable`);
}

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  // [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
};

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  qrcode: true,
});

export const NetworkContextName = "NETWORK";

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});
