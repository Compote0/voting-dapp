import { Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';

export const VotingSession = () => {
	const { isVoter } = useGlobalContext();

	return (
		<>
			<Heading>Voting Session</Heading>
			{isVoter ? (
				<Text>Please proceed to voting session</Text>
				/* TODO: list all proposals in a tab with button to trigger setVote function of the contract with the id of the proposal */
			) : (
				<Text>The voters are currently in the process of voting session</Text>
			)}
		</>
	);
};
