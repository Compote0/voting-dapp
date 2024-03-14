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
			) : (
				<Text>The voters are currently in the process of registering proposals</Text>
			)}
		</>
	);
};
