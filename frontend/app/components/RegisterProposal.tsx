import { Box, Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';
import MemeImage, { MemeImageType } from './MemeImage';

export const RegisterProposal = () => {
	const { isVoter } = useGlobalContext();

	const memeImageData: MemeImageType = {
		src: 'https://media1.tenor.com/m/5qHvGMx9eJMAAAAC/throwing-papers-im-done.gif',
		alt: 'throwing-papers-im-done',
		gifURL: "https://tenor.com/view/throwing-papers-im-done-nope-not-today-sheldon-gif-5610220",
		description: "Paper Throwing Sheldon GIF from Throwing Papers GIFs"
	}

	return (
		<>
			<Heading>Register Proposal</Heading>
			{isVoter ? (
				<Text>Please proceed to proposal registration</Text>
				/* TODO: input for proposal description and submit button to trigger addProposal function of the contract */

				/* TODO: if time */
				/* TODO: put a progress bar to see how much proposal we have out of max proposal = currently 5*/
				/* TODO: create and load table to list the proposal (ID | DESCRIPTION | VOTE COUNT) */
				/* TODO: automatise the loading of the tab (test, listen addProposal event and fill the tab when there is new proposal added) */
			) : (
				<>
					<Text>The voters are currently in the process of registering proposals</Text>
					<Box boxSize='sm' mt={8}>
						<MemeImage memeImageData={memeImageData} />
					</Box>
				</>
			)}
		</>
	);
};
