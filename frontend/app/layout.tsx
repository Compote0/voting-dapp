import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import Layout from "./components/Layout";
import { ReactNode } from 'react';
import { Inter } from "next/font/google";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';


export const metadata = {
  title: "Voting Dapp",
  description: "Dapp for alyra project 3",
};

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: RootLayoutProps) {
  return (
  <html lang="en">
    	<body className={inter.className}>
        <RainbowKitAndChakraProvider>
          <Layout>
            {children}
          </Layout>
        </RainbowKitAndChakraProvider>
      </body>
  </html>
  );
}
