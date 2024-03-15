"use client";
import { ReactNode, createContext, useContext } from "react";
import { contractAddress, contractAbi } from "@/app/constants";
import { useReadContract, useAccount } from "wagmi";
// import { publicClient } from "@/utils/client";
import { Voter } from "@/types/contracts/Voter";


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
		args: [address],
	});
	
	const isVoter = voterInfo?.isRegistered === true;

	const value: globalContextType = {
		currentWorkflowStep: Number(workflowStatusStep),
		isOwner: address === ownerAddress,
		// TODO: update isVoter, call getVoter with the wallet address and check the Voter return variable property isRegistered === true
		isVoter: isVoter, // data.isRegistered === true
		refetchWorkflowStatus: refetchWorkflowStatus
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};