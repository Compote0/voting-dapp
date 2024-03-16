import MemeImage, { MemeImageType } from './MemeImage';
import { useState, useEffect } from 'react';
import { Heading, Text, useToast, Button, Input, Box } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants/index';

export const RegisterVoter = () => {
  const [voterAddress, setVoterAddress] = useState('');
  const { isOwner, getEvents } = useGlobalContext();
  const toast = useToast();

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Registration is pending',
          status: 'success',
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
      getEvents();
      toast({
        title: 'Voter registration is confirmed on the blockchain',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setVoterAddress('');
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

  const handleAddVoterClick = async () => {
    if (voterAddress.trim()) {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "addVoter",
        args: [voterAddress.trim()],
      });
    } else {
      toast({
        title: 'Please enter a valid address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const memeImageData: MemeImageType = {
    src: 'https://media1.tenor.com/m/VcsKeKpld9sAAAAC/frozen-registration.gif',
    alt: 'frozen-registration',
    gifURL: "https://tenor.com/view/frozen-registration-gif-25435300",
    description: "Frozen Registration GIF from Frozen GIFs"
  }

  return (
    <>
      <Heading color='#D0CEBA'>Register Voter</Heading>
      {isOwner ? (
        <>
          <Text color='#D0CEBA'>Please proceed to voter registration</Text>
          <Input
            placeholder="Enter voter's address"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            mt={4}
            color='#E9D2C0'
          />
          <Button
            onClick={handleAddVoterClick}
            isLoading={isPending}
            loadingText="Registering..."
            colorScheme="teal"
            variant="solid"
            mt={4}
          >
            Register Voter
          </Button>
        </>
      ) : (
        <>
          <Text color='#D0CEBA'>The owner is currently in the process of registering voters</Text>
          <Box boxSize='sm' mt={8}>
            <MemeImage memeImageData={memeImageData} />
          </Box>
        </>
      )}
    </>
  );
};

export default RegisterVoter;