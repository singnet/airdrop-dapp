import React, { PropsWithChildren } from "react";
import getLibrary from "./getLibrary";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "./connectors";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

export default function BlockChainProvider({ children }: PropsWithChildren<any>) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>{children}</Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}
