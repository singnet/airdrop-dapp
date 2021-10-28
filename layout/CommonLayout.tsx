import React, { PropsWithChildren } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import Falsemessage from "snet-ui/Flasemessage";
import ListSubheader from "@mui/material/ListSubheader";
import Footer from "snet-ui/Footer";
import Header from "snet-ui/Header";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";

export default function CommonLayout({
  children,
  ...rest
}: PropsWithChildren<any>) {
  const dispatch = useAppDispatch();
  const { account, deactivate } = useActiveWeb3React();
  return (
    <>
      <ListSubheader sx={{ px: 0 }}>
        <Falsemessage />
        <Header
          onConnectWallet={() => dispatch(setShowConnectionModal(true))}
          onDisconnect={deactivate}
          account={account as string}
        />
      </ListSubheader>
      {children}

      <Footer />
    </>
  );
}
