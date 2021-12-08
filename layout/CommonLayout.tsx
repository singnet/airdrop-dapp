import React, { PropsWithChildren } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import Falsemessage from "snet-ui/Falsemessage";
import Learn from "snet-ui/LearnandConnect";
import Footer from "snet-ui/Footer";
import Header from "snet-ui/Header";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";
import Box from "@mui/system/Box";

export default function CommonLayout({
  children,
  ...rest
}: PropsWithChildren<any>) {
  const dispatch = useAppDispatch();
  const { account, deactivate } = useActiveWeb3React();
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",

          zIndex: 2,
        }}
      >
        <Falsemessage />
        <Header
          onConnectWallet={() => dispatch(setShowConnectionModal(true))}
          onDisconnect={deactivate}
          account={account as string}
        />
      </Box>
      <Box sx={{ mt: 23 }}>{children}</Box>
      <Learn />
      <Footer />
    </>
  );
}
