import { Box, Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import MemeImage, { MemeImageType } from './MemeImage';

export const VotingSession = () => {
	const { isVoter } = useGlobalContext();

	const memeImageData: MemeImageType = {
		src: 'https://media.tenor.com/zGv2ArHKgyUAAAAi/our-power-march-for-our-lives.gif',
		alt: 'our-power-march-for-our-lives',
		gifURL: "https://tenor.com/view/our-power-march-for-our-lives-gun-violence-gun-violence-prevention-vote-is-our-power-gif-16811247",
		description: "Our Power March For Our Lives Sticker from Our Power Stickers"
	};

	return (
		<>
			<Heading color='#D0CEBA'>Voting Session</Heading>
			{isVoter ? (
				<Text color='#E9D2C0' mt={4}>Please proceed to voting session</Text>
				/* TODO: list all proposals in a tab (ID | DESCRIPTION | VOTE COUNT) with a button to trigger setVote function of the contract with the id of the proposal */
				/* TODO: when user voted, then refetch the user voter to get the hasVoted === true*/
				/* TODO: when voter.hasVoted === true, disable all Vote buttons*/
				/* TODO: show the proposalId voted*/
			) : (
				<>
					<Text color='#E9D2C0' mt={4}>The voters are currently in the process of voting session</Text>
					<Box boxSize='sm' mt={8}>
						<MemeImage memeImageData={memeImageData} />
					</Box>
				</>
			)}
		</>
	);
};
