export type Proposal = {
	id: number;
	description: string;
	hasVoted: boolean;
	voteCount?: number;
};
