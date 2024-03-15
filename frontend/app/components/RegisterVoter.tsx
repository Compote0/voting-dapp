import { Box, Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import MemeImage, { MemeImageType } from './MemeImage';

export const RegisterVoter = () => {
  const { isOwner } = useGlobalContext();

  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/VcsKeKpld9sAAAAC/frozen-registration.gif',
    alt: 'frozen-registration',
    gifURL: "https://tenor.com/view/frozen-registration-gif-25435300",
    description: "Frozen Registration GIF from Frozen GIFs"
  }

  return (
    <>
      <Heading>Register Voter</Heading>
      {isOwner ? (
        <Text>Please proceed to voter registration</Text>
        /* TODO: input for voter address and submit button to trigger addVoter function of the contract */
      ) : (
        <>
          <Text>The owner is currently in the process of registering voters</Text>
          <Box boxSize='sm' mt={8}>
            <MemeImage memeImageData={memeImageData} />
          </Box>
        </>
      )}
    </>
  );
};
