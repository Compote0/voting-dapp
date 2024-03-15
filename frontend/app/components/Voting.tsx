import { Box, Flex } from '@chakra-ui/react';
import VotingSteps from './VotingSteps';
import Events from './Events';

const Voting = () => {
    return (
        <Flex justify="center">
            <Box m={2} minW={600}>
                <VotingSteps />
            </Box>
            <Box m={2}>
                <Events />
            </Box>
        </Flex>
    );
};

export default Voting;
