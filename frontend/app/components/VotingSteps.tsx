import {
    RegisterVoter,
    RegisterProposal,
    StartVoting,
    VotingSession,
    EndVoting,
    WinningProposal
} from './index';
import { useGlobalContext } from '../context/store';
import WorkflowStatus from '../types/status-workflow';

const VotingSteps = () => {
    const { currentWorkflowStep } = useGlobalContext();

    return (
        <>
            {
                currentWorkflowStep === WorkflowStatus.RegisteringVoters &&
                <RegisterVoter />
            }
            {
                currentWorkflowStep === WorkflowStatus.ProposalsRegistrationStarted &&
                <RegisterProposal />
            }
            {
                currentWorkflowStep === WorkflowStatus.ProposalsRegistrationEnded &&
                <StartVoting />
            }
            {
                currentWorkflowStep === WorkflowStatus.VotingSessionStarted &&
                <VotingSession />
            }
            {
                currentWorkflowStep === WorkflowStatus.VotingSessionEnded &&
                <EndVoting />
            }
            {
                currentWorkflowStep === WorkflowStatus.VotesTallied &&
                <WinningProposal />
            }
        </>
    )
}

export default VotingSteps
