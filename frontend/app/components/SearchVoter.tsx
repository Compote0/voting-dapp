import { useState } from 'react';
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'; import { useAccount } from "wagmi";
import { contractAddress, contractAbi } from "@/app/constants";
import Voter from '../types/voter';
import { publicClient } from '../utils/client';
import { shortenAddress } from '../utils/utilsFunctions';
import { isAddress } from 'viem'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

interface ExtendedVoter extends Voter {
    address: string;
}

const SearchVoter = () => {
    const { address } = useAccount();
    const [voterAddress, setVoterAddress] = useState('');
    const [voters, setVoters] = useState([] as ExtendedVoter[]);
    const toast = useToast();

    const handleSearchVoterClick = async () => {
        if (isAddress(voterAddress)) {
            const readVoter = await publicClient.readContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: "getVoter",
                account: address,
                args: [voterAddress]
            });
            // check if the address is already been watched
            if (voters.findIndex((voter: ExtendedVoter) => voter.address === voterAddress.toString()) !== -1) {
                toast({
                    title: `You are already watching the address ${voterAddress}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            // add the voter to the watchlist
            (readVoter as ExtendedVoter).address = voterAddress;
            setVoters(previousValue => [...previousValue, readVoter as ExtendedVoter]);
        } else {
            toast({
                title: `Couldn't read the voter address ${voterAddress}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Box mb={4}>
                <Input
                    placeholder="Enter voter's address"
                    value={voterAddress}
                    onChange={(e) => setVoterAddress(e.target.value)}
                    mt={4}
                    color='#E9D2C0'
                />
                <Button
                    onClick={handleSearchVoterClick}
                    isDisabled={voterAddress.length === 0}
                    loadingText="Searching..."
                    colorScheme="teal"
                    variant="solid"
                    mt={4}
                >
                    Search Voter
                </Button>
            </Box>
            <Box>
                {voters?.length !== 0 &&
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th color='#D0CEBA'>Address</Th>
                                    <Th color='#D0CEBA'>is Registered</Th>
                                    <Th color='#D0CEBA'>has Voted</Th>
                                    <Th color='#D0CEBA' isNumeric w="80px">Vote</Th>
                                </Tr>
                            </Thead>
                            <Tbody color='#D0CEBA'>
                                {voters.map((voter: ExtendedVoter) => (
                                    <Tr key={crypto.randomUUID()}>
                                        <Td>{shortenAddress(voter.address)}</Td>
                                        <Td>{voter.isRegistered ? <CheckIcon /> : <CloseIcon />}</Td>
                                        <Td>{voter.hasVoted ? <CheckIcon /> : <CloseIcon />}</Td>
                                        <Td>{(Number(voter.votedProposalId) + 1).toString()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                }
            </Box>
        </>
    );
};

export default SearchVoter;
