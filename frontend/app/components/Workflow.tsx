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
import { useEffect, useRef } from "react";
import { WorkflowStatusName, WorkflowStatus } from "@/app/types/status-workflow";

const Workflow = () => {
  const { currentWorkflowStep, isOwner, refetchWorkflowStatus, getEvents, refetchVoterInfo } = useGlobalContext();
  const toast = useToast();
  const currentWorkflowStepRef = useRef(currentWorkflowStep);
  const refetchWorkflowStatusRef = useRef(refetchWorkflowStatus);
  const getEventsRef = useRef(getEvents);
  const toastRef = useRef(toast);

  const {
    data: hash,
    error,
    isPending: setIsPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toastRef.current({
          title: "La transaction du changement de workflow",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toastRef.current({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });
  const errorRef = useRef(error);
  useEffect(() => {
    currentWorkflowStepRef.current = currentWorkflowStep;
    refetchWorkflowStatusRef.current = refetchWorkflowStatus;
    getEventsRef.current = getEvents;
    toastRef.current = toast;
    errorRef.current = error;
  }, [currentWorkflowStep, refetchWorkflowStatus, getEvents, toast, error]);

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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetchWorkflowStatusRef.current();
      if (currentWorkflowStep === WorkflowStatus.ProposalsRegistrationStarted) {
        // in case owner become a voter, we need check it so he can add proposal
        refetchVoterInfo();
      }
      getEventsRef.current();
      toastRef.current({
        title: `Le workflow a changé vers la step ${WorkflowStatusName[currentWorkflowStepRef.current + 1]}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (errorRef.current) {
      toastRef.current({
        title: errorRef.current.message,
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
