import { useEffect } from 'react';
import { useGlobalContext } from '../context/store';
import { Button, useToast, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/constants';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { Proposal } from '../types/proposal';

interface ProposalsProps {
    canVote: boolean;
}

const Proposals = ({ canVote }: ProposalsProps) => {
    const { proposals, voterInfo, refetchVoterInfo, getEvents } = useGlobalContext();
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
                    title: 'Transaction pending...',
                    description: "Your vote is being registered.",
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

    const handleVote = (proposalId: number) => {
        if (voterInfo.hasVoted) {
            toast({
                title: 'Already voted',
                description: `You already voted for: ${voterInfo.votedProposalId}`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if (proposalId !== null && proposals) {
            writeContract({
                args: [proposalId],
                abi: contractAbi,
                functionName: 'setVote',
                address: contractAddress,
            });
        } else {
            toast({
                title: 'Vote Error',
                description: "Invalid proposal ID.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        if (isSuccess) {
            refetchVoterInfo();
            getEvents();
            toast({
                title: `You voted for the proposal ${voterInfo.votedProposalId}!`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        if (error) {
            toast({
                title: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isSuccess]);

    return (
        <>
            {voterInfo.hasVoted && (
                <Alert status="info" variant="left-accent" mt='4'>
                    <AlertIcon />
                    <AlertTitle mr='2'>You voted for : </AlertTitle>
                    <AlertDescription>{(Number(voterInfo.votedProposalId) + 1).toString()}</AlertDescription>
                </Alert>
            )}
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th isNumeric color='#D0CEBA' w="80px">Index</Th>
                            <Th color='#D0CEBA'>Description</Th>
                            <Th color='#D0CEBA' w="80px">{canVote ? ("Vote") : ("Count")}</Th>
                        </Tr>
                    </Thead>
                    <Tbody color='#D0CEBA'>
                        {
                            proposals?.length !== 0 &&
                            proposals?.map((proposal: Proposal, index) => (
                                <Tr key={crypto.randomUUID()}>
                                    <Td isNumeric>{index}</Td>
                                    <Td>{proposal.description}</Td>
                                    <Td >
                                        {canVote ? (
                                            <Button
                                                colorScheme="teal"
                                                variant="solid"
                                                onClick={() => handleVote(index)}
                                                isLoading={isPending}
                                                isDisabled={isSuccess || voterInfo.hasVoted}
                                            >Vote</Button>
                                        ) : (
                                            <>
                                                {proposal.voteCount.toString()}
                                            </>
                                        )}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Proposals;
