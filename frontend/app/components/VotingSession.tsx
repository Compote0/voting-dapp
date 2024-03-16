import { useState, useEffect, useRef } from 'react';
import { Heading, Text, Button, VStack, HStack, useToast } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants';

export const VotingSession = () => {
  const { isVoter, proposals, refetchVoterInfo } = useGlobalContext();
  const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);
  const toast = useToast();
  const toastRef = useRef(toast);
  const errorRef = useRef<any>(null);

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
			description: "Your vote is being registered.",
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

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  function vote() {
	throw new Error('Function not implemented.');
}

	useEffect(() => {
		errorRef.current = error;
	}, [error]);

  useEffect(() => {
    if (isSuccess) {
		toastRef.current({
			title: 'Vote confirmed',
			description: "Your vote has been successfully recorded.",
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		refetchVoterInfo();
		setSelectedProposalId(null);
	} else if (errorRef.current) {
		toastRef.current({
			title: 'Error voting',
			description: errorRef.current.message,
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}
}, [isSuccess, refetchVoterInfo]);

  const handleVote = (proposalId: number) => {
	if (proposalId !== null) {
		setSelectedProposalId(proposalId);
		writeContract({
			args: [proposalId],
			abi: contractAbi,
			functionName: 'setVote',
			address: contractAddress,
		});
	} else {
		toastRef.current({
			title: 'Vote Error',
			description: "Invalid proposal ID.",
			status: 'error',
			duration: 3000,
			isClosable: true,
		});
	}
};

  return (
    <>
      <Heading color='#D0CEBA'>Voting Session</Heading>
      {isVoter ? (
        <VStack spacing={4} align='stretch'>
          <Text color='#E9D2C0' mt={4}>Please proceed to voting session</Text>
          {proposals.map((proposal) => (
            <HStack key={proposal.id} justifyContent="space-between">
              <Text color='#D0CEBA'>{proposal.id} | {proposal.description} | Votes: {proposal.voteCount}</Text>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => handleVote(proposal.id)}
                isLoading={isPending && selectedProposalId === proposal.id}
                isDisabled={isSuccess || proposal.hasVoted}
              >
                Vote
              </Button>
            </HStack>
          ))}
          {selectedProposalId !== null && (
            <Text color='#E9D2C0' mt={4}>You voted for proposal ID: {selectedProposalId}</Text>
          )}
        </VStack>
      ) : (
        <Text color='#E9D2C0' mt={4}>The voters are currently in the process of voting session</Text>
      )}
    </>
  );
};

export default VotingSession;