import React from'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NotAuthorized = () => {
	return (
		<Flex justifyContent='center' alignItems='center' h='100vh'>
            <Heading>Not Authorized</Heading>
            <Text>You are not authorized to access this page.</Text>
            <ConnectButton />
        </Flex>
	);
};

export default NotAuthorized;
