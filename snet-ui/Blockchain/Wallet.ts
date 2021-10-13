import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected, walletconnect } from "./connectors";

interface WalletInfo {
  id: string;
  connector?: AbstractConnector;
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    id: "METAMASK",
    connector: injected,
    name: "MetaMask",
    iconURL: "METAMASK_ICON_URL",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    id: "WALLET_CONNECT",
    connector: walletconnect,
    name: "WalletConnect",
    iconURL: "WALLETCONNECT_ICON_URL",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
};
