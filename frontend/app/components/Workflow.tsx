import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
  Button, useToast
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAddress, contractAbi } from "@/app/constants";
import { useEffect } from "react";
import { WorkflowStatusName, WorkflowStatus } from "@/app/types/status-workflow";

const Workflow = () => {
  const { currentWorkflowStep, isOwner, refetchWorkflowStatus, getEvents } = useGlobalContext();

  const toast = useToast();

  const {
    data: hash,
    error,
    isPending: setIsPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast({
          title: "La transaction du changement de workflow",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });

  const moveToNextWorkflowStep = async () => {
    let functionName = '';
    switch (currentWorkflowStep) {
      case WorkflowStatus.RegisteringVoters:
        functionName = 'startProposalsRegistering';
        break;
      case WorkflowStatus.ProposalsRegistrationStarted:
        functionName = 'endProposalsRegistering';
        break;
      case WorkflowStatus.ProposalsRegistrationEnded:
        functionName = 'startVotingSession';
        break;
      case WorkflowStatus.VotingSessionStarted:
        functionName = 'endVotingSession';
        break;
      case WorkflowStatus.VotingSessionEnded:
        functionName = 'tallyVotes';
        break;
      case WorkflowStatus.VotesTallied:
        functionName = 'reset';
        break;
      default:
        break;
    }
    if (functionName.trim().length !== 0) {
      writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName
      });
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetchWorkflowStatus();
      getEvents();
      toast({
        title: `Le workflow a changé vers la step ${WorkflowStatusName[currentWorkflowStep + 1]}`,
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
  }, [isConfirmed]);

  return (
    <Stepper p="2rem" colorScheme="#417B5A" index={currentWorkflowStep}>
      {WorkflowStatusName.map((workflow, index) => (
        <Step key={crypto.randomUUID()}>
          <StepIndicator>
            <StepStatus
              complete={<Box color="#417B5A"><StepIcon /></Box>}
              incomplete={<Box color="#417B5A"><StepNumber>{index + 1}</StepNumber></Box>}
              active={<Box color="#417B5A"><StepNumber>{index + 1}</StepNumber></Box>}
            />
          </StepIndicator>
          <Box flexShrink="0" color="#D0CEBA">
            <StepTitle>{workflow}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
      {isOwner &&
        <Button disabled={setIsPending} onClick={moveToNextWorkflowStep}>
          {setIsPending ? "Confirming..." : (currentWorkflowStep === WorkflowStatusName.length - 1 ? "Reset" : "Next Step")}
        </Button>}
    </Stepper>
  );
};

export default Workflow;
