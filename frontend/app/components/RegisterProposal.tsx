'use client';
import { useState, useEffect } from 'react';
import { Heading, Text, useToast, Button, Input } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants/index';

export const RegisterProposal = () => {
  const { isVoter } = useGlobalContext();
  const [proposalDescription, setProposalDescription] = useState('');
  const toast = useToast();

  const {
    data: hash,
    error,
    isPending,
    writeContract,
  } = useWriteContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'addProposal',
    args: [proposalDescription],
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
		args: [proposalDescription],
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
        <Text color='#D0CEBA'>Only voters can register proposals</Text>
      )}
    </>
  );
};

export default RegisterProposal;