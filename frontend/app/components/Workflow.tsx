import React, { useEffect, useState } from 'react';
import WorkflowStatus from "../types/status-workflow";
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
} from '@chakra-ui/react';

interface WorkflowProps {
  hasMounted: boolean;
  connectedWallet: {
    address?: string;
  };
}

const WORKFLOWS = Object.entries(WorkflowStatus)
  .filter(([_, value]) => typeof value === 'number')
  .map(([key, _]) => ({
    title: key
      .replace(/([A-Z])/g, ' $1') 
      .trim()
      .replace('Ended', ' Ended'),
  }));

const Workflow = ({ hasMounted, connectedWallet }:WorkflowProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const currentStatusIndex = Object.values(WorkflowStatus).indexOf(WorkflowStatus.VotingSessionStarted);
    setActiveStep(currentStatusIndex >= 0 ? currentStatusIndex : 0);
  }, [connectedWallet]); 

  if (!hasMounted || !connectedWallet?.address) {
    return null;
  }



  return (
    <Stepper p="2rem" colorScheme="#417B5A" index={activeStep}>
      {WORKFLOWS.map((workflow, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<Box color="#417B5A"><StepIcon /></Box>}
              incomplete={<Box color="#417B5A"><StepNumber>{index + 1}</StepNumber></Box>}
              active={<Box color="#417B5A"><StepNumber>{index + 1}</StepNumber></Box>}
            />
          </StepIndicator>
          <Box flexShrink="0" color="#D0CEBA">
            <StepTitle>{workflow.title}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default Workflow;
