import { Heading, Text, Box } from '@chakra-ui/react';
import MemeImage, { MemeImageType } from './MemeImage';

export const StartVoting = () => {
  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/13VnwKt5qS0AAAAd/waiting.gif',
    alt: 'waiting',
    gifURL: "https://tenor.com/fr/view/waiting-gif-23395435",
    description: "Waiting GIF from Waiting GIFs"
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading color='#D0CEBA'>Start Voting Session</Heading>
      <Text color='#E9D2C0' mt={4}>Wait for the admin to begin the voting session.</Text>
      <Box boxSize='sm' mx="auto" mt={8}>
        <MemeImage memeImageData={memeImageData} />
      </Box>
    </Box>
  );
};
