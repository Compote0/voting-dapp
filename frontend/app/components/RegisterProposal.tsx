import { Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';

export const RegisterProposal = () => {
	const { isVoter } = useGlobalContext();

	return (
		<>
			<Heading>Register Proposal</Heading>
			{isVoter ? (
				<Text>Please proceed to proposal registration</Text>
				/* TODO: input for proposal description and submit button to trigger addProposal function of the contract */

				/* TODO: if time */
				/* TODO: put a progress bar to see how much proposal we have out of max proposal = currently 5*/
				/* TODO: create a table to list the proposal (ID | DESCRIPTION | VOTE COUNT) */
				/* TODO: load the proposal tab contract in the frontend table */
				/* TODO: automatise the loading of the tab (test, listen addProposal event and fill the tab when there is new proposal added) */
			) : (
				<Text>The voters are currently in the process of registering proposals</Text>
			)}
		</>
	);
};
