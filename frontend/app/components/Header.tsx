"use client"
import { Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Header = () => {
  return (
    <Flex 
    as="nav" 
    align="start" 
    justify="space-between" 
    padding="1.5rem" 
    bg="#1F2041" 
    color="white"
    >
        <Text fontSize="25" fontWeight="bold">
          Voting Dapp
        </Text>

        <ConnectButton />

    </Flex>
  )
}

export default Header