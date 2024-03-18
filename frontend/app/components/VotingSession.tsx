import { Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import VotingStatus from './VotingStatus';

export const VotingSession = () => {
	const { isVoter } = useGlobalContext();

	return (
		<>
			<Heading color='#D0CEBA' mb='4'>Voting Session</Heading>
			{isVoter ? (
				<>
					<Text color='#E9D2C0' mb='4'>Please proceed to voting session</Text>
					<VotingStatus canVote={true} />
				</>
			) : (
				<Text color='#E9D2C0' mt='4'>The voters are currently in the process of voting session</Text>
			)}
		</>
	);
};

export default VotingSession;
