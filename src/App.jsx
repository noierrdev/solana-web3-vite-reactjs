import { lazy, useState,useMemo, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {SnackbarProvider} from 'notistack'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';

const IndexPage=lazy(()=>import('./pages/index'))

function App() {
  
  const theme=createTheme({
    palette:{
      mode:"dark"
    }
  })

  const network = WalletAdapterNetwork.Mainnet;
  console.log(WalletAdapterNetwork)
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // if desired, manually define specific/custom wallets here (normally not required)
      // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
    ],
    [network],
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider theme={theme}>
          <CssBaseline/>
          <SnackbarProvider>
            <Container maxWidth="xl" >
            <Header/>
            <BrowserRouter>
            <Suspense fallback={<></>} >
              <Routes>
                <Route path="/" element={<IndexPage/>} />
              </Routes>
              </Suspense>
            </BrowserRouter>
            </Container>
          </SnackbarProvider>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
