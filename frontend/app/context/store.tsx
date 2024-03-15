"use client";
import { ReactNode, createContext, useContext } from "react";
import { contractAddress, contractAbi } from "@/app/constants";
import { useReadContract, useAccount } from "wagmi";
// import { publicClient } from "@/utils/client";
import { VoterInfo } from "@/app/types/voter";


type globalContextType = {
	currentWorkflowStep: number;
	isOwner: boolean;
	isVoter: boolean;
	refetchWorkflowStatus: () => void;
	// logout: () => void;
};
const globalContextDefaultValues: globalContextType = {
	currentWorkflowStep: 0,
	isOwner: false,
	isVoter: false,
	refetchWorkflowStatus: () => { },
	// logout: () => {},
};
const GlobalContext = createContext<globalContextType>(globalContextDefaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const { address } = useAccount();

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
	
	const isVoter = VoterInfo?.isRegistered === true;

	const value: globalContextType = {
		currentWorkflowStep: Number(workflowStatusStep),
		isOwner: address === ownerAddress,
		isVoter: isVoter, 
		refetchWorkflowStatus: refetchWorkflowStatus
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};