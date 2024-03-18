import { Box, Heading, Text, Tag } from "@chakra-ui/react";
import MemeImage, { MemeImageType } from "./MemeImage";
import { useReadContract, useAccount } from "wagmi";
import { contractAddress, contractAbi } from "@/app/constants";
import Confetti from 'react-confetti';
import VotingStatus from "./VotingStatus";
import { useGlobalContext } from '../context/store';

export const WinningProposal = () => {
  const { isVoter } = useGlobalContext();
  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/AVKXBs5934YAAAAd/dumbledore-clapping.gif',
    alt: 'dumbledore-clapping',
    gifURL: "https://tenor.com/view/dumbledore-clapping-gif-25342009",
    description: "Dumbledore Clapping GIF from Dumbledore GIFs"
  };

  // read winningProposalID on contract
  const { address } = useAccount();
  const {
    data: winningProposalID,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "winningProposalID",
    account: address,
  });

  // display confetti
  const displayConfetti = () => {
    const confettiWidth = 500, confettiHeigh = 500;

    return (<Confetti
      width={confettiWidth}
      height={confettiHeigh}
      recycle={false}
      confettiSource={{
        w: 10,
        h: 10,
        x: confettiWidth / 2,
        y: confettiHeigh / 2,
      }}
    />)
  }

  return (
    <>
      <Heading color='#D0CEBA' mb={4}>The winner is 🥁</Heading>
      {displayConfetti()}
      <Text color='#E9D2C0' mb={4}>The proposal number <Tag>{(Number(winningProposalID) + 1).toString()}</Tag></Text>
      {isVoter ? (
        <VotingStatus canVote={false} />
      ) : (
        <Box boxSize='sm' mt={8}>
          <MemeImage memeImageData={memeImageData} />
        </Box>
      )}
    </>
  );
};

