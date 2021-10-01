import React, { PropsWithChildren, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { network, NetworkContextName } from "./connectors";
import { Dialog } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useEagerConnect, useInactiveListener } from "./web3Hooks";

export default function Web3ReactManager({ children }: PropsWithChildren<any>) {
  const { active } = useWeb3React();
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !active && networkError) {
    return (
      <Dialog open={Boolean(triedEager && !active && networkError)}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
        </Alert>
      </Dialog>
    );
  }

  return children;
}
