"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { contractAddress, contractAbi } from "@/app/constants";
import { useReadContract, useAccount } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "@/app/utils/client";
import Voter from "../types/voter";
import { Proposal } from "../types/proposal";
import { WorkflowStatusName } from "../types/status-workflow";
import { Event } from "../types/event";
import { shortenAddress } from "../utils/utilsFunctions";

type globalContextType = {
	currentWorkflowStep: number;
	refetchWorkflowStatus: () => void;
	isOwner: boolean;
	isVoter: boolean;
	voterInfo: Voter;
	refetchVoterInfo: () => void;
	events: Event[];
	getEvents: () => void;
	proposals: Proposal[];
	proposalId: number;
	refetchProposalId: () => void;
	refetchAllProposals: () => void;
};
const globalContextDefaultValues: globalContextType = {
	currentWorkflowStep: 0,
	refetchWorkflowStatus: () => { },
	isOwner: false,
	isVoter: false,
	voterInfo: {} as Voter,
	refetchVoterInfo: () => { },
	events: [],
	getEvents: () => { },
	proposals: [],
	proposalId: 0,
	refetchProposalId: () => { },
	refetchAllProposals: async () => { },
};
const GlobalContext = createContext<globalContextType>(globalContextDefaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const { address } = useAccount();

	// --- read and refetch workflowStatusStep, ownerAddress, voterInfo
	//
	const {
		data: workflowStatusStep,
		isPending: pendingWorkflowStatus,
		refetch: refetchWorkflowStatus,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "workflowStatus",
		account: address,
	});

	const {
		data: ownerAddress,
		isPending: pendingOwnerAddress,
		refetch: refetchOwnerAddress,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "owner",
		account: address,
	});

	const {
		data: voterInfo,
		refetch: refetchVoterInfo,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "getVoter",
		account: address,
		args: [address],
	}) ;

	
	const isVoter = ((voterInfo as unknown) as Voter)?.isRegistered === true;

	// --- read and refetch proposals //

	const {
		data: proposalIdData,
		isPending: pendingproposalId,
		refetch: refetchProposalId,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "getOneProposal",
		account: address,
	});

	const proposalId = typeof proposalIdData === 'number' ? proposalIdData : 0;

	const {
		data: allProposals,
		isPending: pedingAllProposals,
		refetch: refetchAllProposals,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "getProposals",
		account: address,
	});

	// --- read and refetch events
	//
	const [events, setEvents] = useState<Event[]>([]);
	const deployedBlockNumber = process.env.NEXT_PUBLIC_DEPLOYED_BLOCKNUMBER || 0;
	const getEvents = async () => {
		const voterRegisteredEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event VoterRegistered(address voterAddress)"
			),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const workflowStatusChangeEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
			),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const proposalRegisteredEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event ProposalRegistered(uint proposalId)"
			),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const votedEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event Voted(address voter, uint proposalId)"
			),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const deployEvent: Event = {
			icon: "SettingsIcon",
			title: "Contract deployed",
			message: `Voting contract has been deployed block n°${deployedBlockNumber}`,
			blockNumber: Number(deployedBlockNumber)
		};
		const combinedEvents: Event[] = [deployEvent].concat(voterRegisteredEvent.map((event) =>
		({
			icon: "AddIcon",
			title: "Register Voter",
			message: `Address ${shortenAddress(event.args.voterAddress)}`,
			blockNumber: Number(event.blockNumber),
		})
		)).concat(
			workflowStatusChangeEvent.map((event) => ({
				icon: "ArrowRightIcon",
				title: "Update Workflow",
				message: `${WorkflowStatusName[Number(event.args.newStatus)]}`,
				blockNumber: Number(event.blockNumber),
			})
			)).concat(
				proposalRegisteredEvent.map((event) => ({
					icon: "DownloadIcon",
					title: 'Register Proposal',
					message: `New proposal n°${event.args.proposalId} has been registed`,
					blockNumber: Number(event.blockNumber),
				})
				)).concat(votedEvent.map((event) => ({
					icon: "AttachmentIcon",
					title: "Voted",
					message: `Voter ${shortenAddress(event.args.voter)} voted the proposal n°${event.args.proposalId}`,
					blockNumber: Number(event.blockNumber),
				})));

		combinedEvents.sort(function (a, b) {
			return b.blockNumber - a.blockNumber;
		});

		setEvents(combinedEvents);
	};

	useEffect(() => {
		const getAllEvents = async () => {
			if (address !== undefined) {
				await getEvents();
			}
		};
		getAllEvents();
	}, [address]);

	// create globalContext value
	const value: globalContextType = {
		currentWorkflowStep: Number(workflowStatusStep),
		refetchWorkflowStatus: refetchWorkflowStatus,
		isOwner: address === ownerAddress,
		isVoter: isVoter,
		voterInfo: voterInfo as Voter,
		refetchVoterInfo,
		events: events,
		getEvents: getEvents,
		proposals: allProposals as Proposal[],
		proposalId,
		refetchAllProposals: refetchAllProposals,
		refetchProposalId: refetchProposalId,
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};