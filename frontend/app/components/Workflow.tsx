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
  Button,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';

const Workflow = () => {
  const { currentWorkflowStep, isOwner } = useGlobalContext();

  return (
    <Stepper p="2rem" colorScheme="#417B5A" index={currentWorkflowStep}>
      {Object.values(WorkflowStatus).map((workflow, index) => (
        <Step key={index}>
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
      {isOwner && (<Button>Next Step</Button>)}
    </Stepper>
  );
};

export default Workflow;
