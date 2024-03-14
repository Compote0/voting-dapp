import { useState, useEffect } from 'react';
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import {
    NotAuthorized,
    NotConnected,
    RegisterVoter,
    RegisterProposal,
    StartVoting,
    VotingSession,
    WinningProposal,
} from './index';
import { useGlobalContext } from '../context/store';
import Workflow from './Workflow';

// type WorkflowStatus =
//     | 'RegisteringVoters'
//     | 'ProposalsRegistrationStarted'
//     | 'ProposalsRegistrationEnded'
//     | 'VotingSessionStarted'
//     | 'VotingSessionEnded'
//     | null;


// const checkIfAdmin = (address: string) => {
//     const adminAddresses = ["0xAdminAddress1", "0xAdminAddress2"];
//     return adminAddresses.includes(address);
// };

// // Simulate fetching workflow status and if the wallet is authorized
// // You will need to replace this with your actual logic
// const useWorkflowStatusAndAuthorization = (address: string) => {
//     const [currentWorkflowStatus, setCurrentWorkflowStatus] = useState<WorkflowStatus>(null);
//     const [isWalletAuthorized, setIsWalletAuthorized] = useState(false);

//     useEffect(() => {
//         // Fetch workflow status from your smart contract or backend
//         // For demonstration purposes, we'll just set it directly
//         // setCurrentWorkflowStatus('YourWorkflowStatusHere');

//         // Check if the wallet is authorized
//         // For demonstration purposes, we'll assume it is authorized
//         setIsWalletAuthorized(true);
//     }, [address]);

//     return { currentWorkflowStatus, isWalletAuthorized };
// };

export default function Voting() {

    return (<RegisterVoter />
    )
    // const { address, isConnected } = useAccount();
    // const { currentWorkflowStatus, isWalletAuthorized } = useWorkflowStatusAndAuthorization(address);

    // if (!isConnected) return <Flex align="center" justify="center" minH="100vh" maxH="100vh" overflow="hidden"><NotConnected /></Flex>;

    // const isAdmin = address && checkIfAdmin(address);
    // if (isAdmin) return <Flex align="center" justify="center" minH="100vh" maxH="100vh" overflow="hidden"></Flex>;

    // if (!isWalletAuthorized) return <Flex align="center" justify="center" minH="100vh" maxH="100vh" overflow="hidden"><NotAuthorized /></Flex>;

    // switch (currentWorkflowStatus) {
    //     case 'RegisteringVoters':
    //         return <RegisterVoter />;
    //     case 'ProposalsRegistrationStarted':
    //         return <RegisterProposal />;
    //     case 'ProposalsRegistrationEnded':
    //         return <StartVoting />;
    //     case 'VotingSessionStarted':
    //         return <VotingSession />;
    //     case 'VotingSessionEnded':
    //         return <WinningProposal />;
    //     default:
    //         return <NotAuthorized />;
    // }
}
