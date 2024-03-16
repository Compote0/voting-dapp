export enum WorkflowStatus {
	RegisteringVoters,
	ProposalsRegistrationStarted,
	ProposalsRegistrationEnded,
	VotingSessionStarted,
	VotingSessionEnded,
	VotesTallied,
}

export const WorkflowStatusName = [
	"Registering Voters",
	"Proposals Registration Started",
	"Proposals Registration Ended",
	"Voting Session Started",
	"Voting Session Ended",
	"Votes Tallied",
];
