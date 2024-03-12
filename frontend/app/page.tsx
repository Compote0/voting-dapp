'use client';
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";

import AdminVoting from "./components/AdminVoting";
import VoterVoting from "./components/VoterVoting";
import NotConnected from "./components/NotConnected";


const checkIfAdmin = (address: string) => {
  const adminAddresses = ["0xAdminAddress1", "0xAdminAddress2"];
  return adminAddresses.includes(address);
};

export default function Home() {
  const { address, isConnected } = useAccount();

  const isAdmin = address && checkIfAdmin(address);

  return (
    <Flex align="center" justify="center" minH="100vh" maxH="100vh" overflow="hidden">
      {isConnected ? (
        isAdmin ? (
          <AdminVoting />
        ) : (
          <VoterVoting />
        )
      ) : (
        <NotConnected />
      )}
    </Flex>
  );
}
