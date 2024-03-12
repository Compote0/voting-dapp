"use client"
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
        p="2rem"
        justifyContent="center"
        alignItems="center"
    >
        <Text fontSize="sm" color="#D0CEBA">
          © 2023 Voting Dapp. All rights reserved. &copy; Alyra {new Date().getFullYear()}
          </Text>
    </Flex>
  )
}

export default Footer