import { Heading, Text } from "@chakra-ui/react";

export const WinningProposal = () => {
	return (
		<>
			<Heading>The winner is 🥁</Heading>
			{
				/* TODO: read the winningProposalID property of the voting contract */
				/* TODO: show a chartjs pie of the vote https://www.chartjs.org/docs/latest/samples/other-charts/pie.html*/
				/* TODO: trigger confetti https://confettijs.org/*/
			}
			<Text>The proposal number X</Text>
		</>
	);
};

