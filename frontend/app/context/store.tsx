"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { contractAddress, contractAbi } from "@/app/constants";
import { useReadContract, useAccount } from "wagmi";
import { publicClient } from "@/app/utils/client";
import Voter from "../types/voter";
import { parseAbiItem } from "viem";
import { VotingEvent } from "../components/Events";
import { WorkflowStatusName } from "../types/status-workflow";

type globalContextType = {
	currentWorkflowStep: number;
	refetchWorkflowStatus: () => void;
	isOwner: boolean;
	isVoter: boolean;
	events: VotingEvent[];
	getEvents: () => void;
};
const globalContextDefaultValues: globalContextType = {
	currentWorkflowStep: 0,
	refetchWorkflowStatus: () => { },
	isOwner: false,
	isVoter: false,
	events: [],
	getEvents: () => { },
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
	});

	const isVoter = (voterInfo as Voter)?.isRegistered === true;

	// --- read and refetch events
	//
	const [events, setEvents] = useState<VotingEvent[]>([]);

	const getEvents = async () => {
		const voterRegisteredEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event VoterRegistered(address voterAddress)"
			),
			fromBlock: BigInt(0),
			toBlock: "latest",
		});

		const workflowStatusChangeEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
			),
			fromBlock: BigInt(0),
			toBlock: "latest",
		});

		const combinedEvents: VotingEvent[] = voterRegisteredEvent
			.map((event) =>
			({
				icon: "AddIcon",
				title: "Register Voter",
				message: `Address ${event.args.voterAddress?.toString()}`,
				blockNumber: Number(event.blockNumber),
			})
			)
			.concat(
				workflowStatusChangeEvent.map((event) => ({
					icon: "ArrowRightIcon",
					title: "Update Workflow",
					message: `${WorkflowStatusName[Number(event.args.newStatus)]}`,
					blockNumber: Number(event.blockNumber),
				})
				));

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
		events: events,
		getEvents: getEvents
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};