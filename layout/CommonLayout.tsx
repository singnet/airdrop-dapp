import React, { PropsWithChildren } from "react";
import { useActiveWeb3React } from "snet-ui/Blockchain/web3Hooks";
import Falsemessage from "snet-ui/Flasemessage";
import Footer from "snet-ui/Footer";
import Header from "snet-ui/Header";
import { setShowConnectionModal } from "utils/store/features/walletSlice";
import { useAppDispatch } from "utils/store/hooks";

export default function CommonLayout({ children, ...rest }: PropsWithChildren<any>) {
  const dispatch = useAppDispatch();
  const { account } = useActiveWeb3React();
  return (
    <>
      <Falsemessage />
      <Header onConnectWallet={() => dispatch(setShowConnectionModal(true))} account={account as string} />
      {children}
      <Footer />
    </>
  );
}
