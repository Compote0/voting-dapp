import { useState, useEffect } from 'react';
import { Heading, Text, useToast, Button, Input } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants/index';

export const RegisterVoter = () => {
  const [voterAddress, setVoterAddress] = useState('');
  const { isOwner } = useGlobalContext();   
  const toast = useToast();

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'setVoter',
    args: [voterAddress],
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Voter registered successfully',
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
  }, [isSuccess, error, toast]);

  const handleAddVoterClick = async () => {
    if (voterAddress) {
      writeContract({
				address: contractAddress,
				abi: contractAbi,
				functionName: "addVoter",
        args: [voterAddress],
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
        <Text color='#D0CEBA'>The owner is currently in the process of registering voters</Text>
      )}
    </>
  );
};

export default RegisterVoter;