import { Box, Heading, Text } from '@chakra-ui/react';
import MemeImage, { MemeImageType } from './MemeImage';
import { useGlobalContext } from '../context/store';

export const EndVoting = () => {
	const { isVoter } = useGlobalContext();

	const memeImageData: MemeImageType = {
		src: 'https://media1.tenor.com/m/WJDBX8_qMD4AAAAC/spongebob.gif',
		alt: 'spongebob',
		gifURL: "https://tenor.com/view/spongebob-gif-22965621",
		description: "Spongebob GIF from Spongebob GIFs"
	};

	return (
		<>
			<Heading color='#D0CEBA'>End Voting Session</Heading>
			{isVoter && (
				<Text color='#E9D2C0' mt={4}>Search a Voter</Text>
				/* TODO: input address + submit button to display a voter*/
				/* TODO: display a voter info CARD
					+ address 
					+ isRegistered 
					+ hasVoted 
					+ proposalId*/
			)}
			<Text color='#E9D2C0' mt={4}>The voting session has ended, vote tallying will start soon</Text>
			<Box boxSize='sm' mt={8}>
				<MemeImage memeImageData={memeImageData} />
			</Box>
		</>
	);
};
