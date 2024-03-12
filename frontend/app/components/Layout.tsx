"use client"
import React, { useEffect, useState } from 'react';
import Header from './Header'
import Footer from './Footer'
import Workflow from '../components/Workflow'
import { Flex } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
}


const Layout = ({ children }: LayoutProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const connectedWallet = { address: '0x...' };

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      minHeight="80vh"
      alignItems="stretch"
      bg="#4B3F72"
    >
        <Header />
        <Workflow hasMounted={hasMounted} connectedWallet={connectedWallet} />
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
  )
}

export default Layout