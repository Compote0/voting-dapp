'use client';

import { useAccount } from "wagmi";
import Header from './Header';
import Footer from './Footer';
import Workflow from '../components/Workflow';
import { Flex } from '@chakra-ui/react';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { address, isConnected } = useAccount();
  
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      minHeight="80vh"
      alignItems="stretch"
      bg="#4B3F72"
    >
        <Header />
        <Workflow hasMounted={isConnected} connectedWallet={{ address }} />
        <Flex
          grow="1"
          p="2rem"
          direction="column" 
          flex="1" 
        >
            {children}
        </Flex>
        <Footer />
    </Flex>
  );
}

export default Layout;
