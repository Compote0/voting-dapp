import React from'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NotAuthorized = () => {
	return (
		<Flex direction="column" justifyContent='center' alignItems='center' h='100vh'>
            <Heading color="#1F2041" p='1rem'>Not Authorized</Heading>
            <Text color="#D0CEBA" p='1rem'>You are not authorized to access this page.</Text>
            <ConnectButton />
        </Flex>
	);
};

export default NotAuthorized;
