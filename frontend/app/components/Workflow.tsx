import React, { useEffect, useState } from 'react';
import WorkflowStatus from "../types/status-workflow";
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';

interface WorkflowProps {
  hasMounted: boolean;
  connectedWallet: {
    address?: string;
  };
}

const WORKFLOWS = Object.entries(WorkflowStatus)
  .filter(([key, value]) => typeof value === 'number') 
  .map(([key, value]) => ({
    status: value,
    title: key
      .split(/(?=[A-Z])/)
      .join(' ')
      .replace('Ended', ' Ended'),
  }));


const Workflow: React.FC<WorkflowProps> = ({ hasMounted, connectedWallet }) => {
  const [currentStatus, setCurrentStatus] = useState<WorkflowStatus | null>(null);

  useEffect(() => {
    setCurrentStatus(WorkflowStatus.VotingSessionStarted); 
  }, [connectedWallet]); 

  if (!hasMounted || !connectedWallet?.address) {
    return null;
  }

  const currentStepIndex = WORKFLOWS.findIndex(wf => wf.status === currentStatus);

  return (
    <VStack spacing={4} align="stretch">
      {WORKFLOWS.map((workflow, index) => {
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;
        return (
          <HStack key={workflow.status} spacing={4}>
            <Icon as={isCompleted ? CheckCircleIcon : TimeIcon} color={isCompleted ? 'green.500' : 'gray.500'} />
            <Text fontWeight={isActive ? 'bold' : 'normal'} color={isActive ? 'blue.500' : 'gray.700'}>
              {workflow.title}
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default Workflow;
