import React, { PropsWithChildren } from 'react';
import Box from '@mui/system/Box';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import Falsemessage from 'snet-ui/Falsemessage';
import Learn from 'snet-ui/LearnandConnect';
import Footer from 'snet-ui/Footer';
import Header from 'snet-ui/Header';

type CommonLayoutProps = {
  handleScrollToLink: (scrollToKey?: string) => void;
};
export default function CommonLayout({ children, handleScrollToLink, ...rest }: PropsWithChildren<CommonLayoutProps>) {
  const { account, deactivate } = useActiveWeb3React();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2,
        }}
      >
        <Falsemessage />
        <Header />
      </Box>
      <Box>{children}</Box>
      <Learn />
      <Footer handleScrollToLink={handleScrollToLink} />
    </>
  );
}
