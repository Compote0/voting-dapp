import { Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';

export const VotingSession = () => {
	const { isVoter } = useGlobalContext();

	return (
		<>
			<Heading>Voting Session</Heading>
			{isVoter ? (
				<Text>Please proceed to voting session</Text>
				/* TODO: list all proposals in a tab (ID | DESCRIPTION | VOTE COUNT) with a button to trigger setVote function of the contract with the id of the proposal */
				/* TODO: when user voted, then refetch the user voter to get the hasVoted === true*/
				/* TODO: when voter.hasVoted === true, disable all Vote buttons*/
				/* TODO: show the proposalId voted*/
			) : (
				<Text>The voters are currently in the process of voting session</Text>
			)}
		</>
	);
};
