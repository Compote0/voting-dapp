import { useState, useEffect, useRef } from 'react';
import MemeImage, { MemeImageType } from './MemeImage';
import { Heading, Text, useToast, Button, Input, Box } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants/index';

export const RegisterProposal = () => {
  const { isVoter, getEvents } = useGlobalContext();
  const [proposalDescription, setProposalDescription] = useState('');
  const toast = useToast();
  const toastRef = useRef(toast);
  const errorRef = useRef<any | null>(null);

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
        toastRef.current({
          title: 'Transaction pending...',
          description: "Your proposal is being registered.",
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toastRef.current({
          title: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  useEffect(() => {
    errorRef.current = error;
  }, [error]);

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      getEvents();
      toastRef.current({
        title: 'Proposal registration is confirmed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProposalDescription('');
    }
    if (errorRef.current) {
      toastRef.current({
        title: errorRef.current.message,
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
      toastRef.current({
        title: 'Please enter a valid proposal description',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading color='#D0CEBA' mb={4}>Register Proposal</Heading>
      {isVoter ? (
        <>
          <Text color='#D0CEBA' mb={4}>Please proceed to proposal registration</Text>
          <Input
            placeholder="Enter proposal's description"
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            mr={4}
            color='#E9D2C0'
          />
          <Button
            onClick={handleAddProposalClick}
            isLoading={isPending}
            isDisabled={proposalDescription.length === 0}
            loadingText="Registering..."
            colorScheme="teal"
            variant="solid"
            mt={4}
            w={250}
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