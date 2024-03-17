import { Box, Heading, Text, Tag } from "@chakra-ui/react";
import MemeImage, { MemeImageType } from "./MemeImage";
import { useReadContract, useAccount } from "wagmi";
import { contractAddress, contractAbi } from "@/app/constants";
import Confetti from 'react-confetti';

export const WinningProposal = () => {
  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/AVKXBs5934YAAAAd/dumbledore-clapping.gif',
    alt: 'dumbledore-clapping',
    gifURL: "https://tenor.com/view/dumbledore-clapping-gif-25342009",
    description: "Dumbledore Clapping GIF from Dumbledore GIFs"
  };

  const confettiWidth = 500, confettiHeigh = 500;

  const { address } = useAccount();

  const {
    data: winningProposalID,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "winningProposalID",
    account: address,
  });

  return (
    <>
      <Heading color='#D0CEBA' mb={4}>The winner is 🥁</Heading>
      <Confetti
        width={confettiWidth}
        height={confettiHeigh}
        recycle={false}
        confettiSource={{
          w: 10,
          h: 10,
          x: confettiWidth / 2,
          y: confettiHeigh / 2,
        }}
      />
      <Text color='#E9D2C0' mb={4}>The proposal number <Tag>{winningProposalID?.toString()}</Tag></Text>
      <Box boxSize='sm' mt={8}>
        <MemeImage memeImageData={memeImageData} />
      </Box>
    </>
  );
};

