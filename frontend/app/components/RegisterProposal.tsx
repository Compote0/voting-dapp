import MemeImage, { MemeImageType } from './MemeImage';
import { useState, useEffect } from 'react';
import { Heading, Text, useToast, Button, Input, Box } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants/index';

export const RegisterProposal = () => {
  const { isVoter } = useGlobalContext();
  const [proposalDescription, setProposalDescription] = useState('');
  const toast = useToast();

  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/5qHvGMx9eJMAAAAC/throwing-papers-im-done.gif',
    alt: 'throwing-papers-im-done',
    gifURL: "https://tenor.com/view/throwing-papers-im-done-nope-not-today-sheldon-gif-5610220",
    description: "Paper Throwing Sheldon GIF from Throwing Papers GIFs"
  }

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Transaction pending...',
          description: "Your proposal is being registered.",
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Proposal registration is confirmed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProposalDescription('');
    }
    if (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  const handleAddProposalClick = async () => {
    if (proposalDescription.trim()) {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'addProposal',
        args: [proposalDescription.trim()],
      });
    } else {
      toast({
        title: 'Please enter a valid proposal description',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  return (
    <>
      <Heading color='#D0CEBA'>Register Proposal</Heading>
      {isVoter ? (
        <>
          <Text color='#D0CEBA'>Please proceed to proposal registration</Text>
          <Input
            placeholder="Enter proposal's description"
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            mt={4}
            color='#E9D2C0'
          />
          <Button
            onClick={handleAddProposalClick}
            isLoading={isPending}
            loadingText="Registering..."
            colorScheme="teal"
            variant="solid"
            mt={4}
          >
            Register Proposal
          </Button>
        </>
      ) : (
        <>
          <Text color='#D0CEBA'>The voters are currently in the process of registering proposals</Text>
          <Box boxSize='sm' mt={8}>
            <MemeImage memeImageData={memeImageData} />
          </Box>
        </>
      )}
    </>
  );
};

export default RegisterProposal;