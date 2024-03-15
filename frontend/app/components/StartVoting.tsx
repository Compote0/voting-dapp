import { Heading, Text, Box, Image } from '@chakra-ui/react';

export const StartVoting = () => {
  return (
    <Box textAlign="center" p={5}>
      <Heading color='#D0CEBA'>Start Voting Session</Heading>
      <Text color='#E9D2C0' mt={4}>Wait for the admin to begin the voting session.</Text>
      <Box mt={4}>
	  <Image src="https://media1.tenor.com/m/13VnwKt5qS0AAAAd/waiting.gif" alt="Waiting GIF" boxSize="250px" mx="auto"/>
      </Box>
    </Box>
  );
};