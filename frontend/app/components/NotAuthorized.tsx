import { Flex, Heading, Text } from '@chakra-ui/react';

const NotAuthorized = () => {
    return (
        <Flex direction="column" justifyContent='center' alignItems='center'>
            <Heading color="#1F2041" p='1rem'>Not Authorized</Heading>
            <Text color="#D0CEBA" p='1rem'>You are not authorized to access this page.</Text>
        </Flex>
    );
};

export default NotAuthorized;
