'use client';
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

function NotConnected() {
  return (
    <>
        <Alert status='warning'>
            <AlertIcon />
            Please connect your Wallet.
        </Alert>
    </>
  )
}

export default NotConnected