import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { MdOutlineHowToVote } from "react-icons/md";
import MemeImage, { MemeImageType } from "./MemeImage";

const NotConnected = () => {
  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/kh_cOjHuufEAAAAd/sponge-bob-sponge-bob-mail.gif',
    alt: 'sponge-bob-sponge-bob-mail',
    gifURL: "https://tenor.com/view/sponge-bob-sponge-bob-mail-postman-election-day-vote-gif-18099193",
    description: "Sponge Bob Sponge Bob Mail GIF from Sponge Bob GIFs"
  };

  return (
    <Box textAlign="center" p="4">
      <Flex direction="column" justifyContent="center" alignItems="center" >
        <Box mb="4">
          <Icon as={MdOutlineHowToVote} boxSize="50px" color="#417B5A" />
          <Heading as="h1" fontSize="4xl" mt="4" color="#E9D2C0">
            Welcome to the best Voting DApp on the Blockchain!
          </Heading>
          <Text fontSize="lg" mt="2" color="#E9D2C0">
            Please connect your wallet to continue.
          </Text>
        </Box>
        <Box boxSize='sm' mt={8}>
          <MemeImage memeImageData={memeImageData} />
        </Box>
      </Flex>
    </Box>
  );
};

export default NotConnected;
