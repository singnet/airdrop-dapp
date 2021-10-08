import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { lightTheme } from "snet-ui/Theme/theme";
import createEmotionCache from "snet-ui/Theme/createEmotionCache";
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import WalletModal from "snet-ui/Blockchain/WalletModal";
import { store } from "utils/store";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "utils/store/hooks";
import { setShowConnectionModal } from "utils/store/features/walletSlice";

const BlockChainProvider = dynamic(() => import("snet-ui/Blockchain/Provider"), { ssr: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps) {
  // @ts-ignore
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { showConnectionModal } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BlockChainProvider>
          <Component {...pageProps} />
          <WalletModal open={showConnectionModal} setOpen={(val) => dispatch(setShowConnectionModal(val))} />
        </BlockChainProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

const AppWithRedux = (props: AppProps) => (
  <Provider store={store}>
    <MyApp {...props} />
  </Provider>
);
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

// @ts-ignore
export default appWithTranslation(AppWithRedux, nextI18NextConfig);
