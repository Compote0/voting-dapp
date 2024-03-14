enum WorkflowStatus {
	RegisteringVoters,
	ProposalsRegistrationStarted,
	ProposalsRegistrationEnded,
	VotingSessionStarted,
	VotingSessionEnded,
	VotesTallied,

	// RegisteringVoters = "Registering Voters",
	// ProposalsRegistrationStarted = "Proposals Registration Started",
	// ProposalsRegistrationEnded = "Proposals Registration Ended",
	// VotingSessionStarted = "Voting Session Started",
	// VotingSessionEnded = "Voting Session Ended",
	// VotesTallied = "Votes Tallied",
}

export default WorkflowStatus;

export const WorkflowStatusName = [
	"Registering Voters",
	"Proposals Registration Started",
	"Proposals Registration Ended",
	"Voting Session Started",
	"Voting Session Ended",
	"Votes Tallied",
];

// export function getWorkflowStatusIndex(workflowParam: WorkflowStatus) {
// 	return Object.keys(WorkflowStatus).findIndex((workflow) => {
// 		console.log("workflow", workflow);
// 		console.log("workflowParam", workflowParam);
// 		console.log("workflowParam.[x]", WorkflowStatus[workflowParam]);
// 		workflow === workflowParam;
// 	});
// }
