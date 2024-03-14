'use client';
import { ChakraProvider } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  hardhat
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from 'react';

const WALLETCONNECT_PROJECTID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || "";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: WALLETCONNECT_PROJECTID,
  chains: [hardhat],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

interface RainbowKitAndChakraProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }: RainbowKitAndChakraProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ChakraProvider toastOptions={{
            defaultOptions: {
              duration: 6000,
              isClosable: true,
              position: "bottom"
            }
          }}

          >
            {children}
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitAndChakraProvider;
