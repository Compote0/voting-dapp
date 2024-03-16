import { Box, Heading, Text } from "@chakra-ui/react";
import MemeImage, { MemeImageType } from "./MemeImage";

export const WinningProposal = () => {
  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/AVKXBs5934YAAAAd/dumbledore-clapping.gif',
    alt: 'dumbledore-clapping',
    gifURL: "https://tenor.com/view/dumbledore-clapping-gif-25342009",
    description: "Dumbledore Clapping GIF from Dumbledore GIFs"
  };

  return (
    <>
      <Heading color='#D0CEBA'>The winner is 🥁</Heading>
      {
        /* TODO: read the winningProposalID property of the voting contract */
        /* TODO: show a chartjs pie of the vote https://www.chartjs.org/docs/latest/samples/other-charts/pie.html*/
        /* TODO: trigger confetti https://confettijs.org/*/
      }
      <Text color='#E9D2C0' mt={4}>The proposal number X</Text>
      <Box boxSize='sm' mt={8}>
        <MemeImage memeImageData={memeImageData} />
      </Box>
    </>
  );
};

