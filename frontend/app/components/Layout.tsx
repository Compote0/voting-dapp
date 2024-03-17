"use client";
import Header from './Header';
import Footer from './Footer';
import { Flex } from '@chakra-ui/react';
import Workflow from './Workflow';
import { useAccount } from "wagmi";
import BlockchainStatus from './BlockchainStatus';
import VerifyContractAddress from './VerifyContractAddress';
import { contractAddress } from '@/app/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isConnected } = useAccount();

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      minH="100vh"
      alignItems="stretch"
      bg="#4B3F72"
    >
      <Header />
      <BlockchainStatus /> 
      <VerifyContractAddress contractAddress={contractAddress} />
      {isConnected && <Workflow />}      
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
