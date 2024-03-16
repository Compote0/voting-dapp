import { ethers } from "hardhat";

async function main() {
	const interaceName = "Voting";
	const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

	const voting = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	await voting.reset();
	console.log(
		"Voting contract has been reseted (WorkflowStatus, ProposalArray, winningProposalID)."
	);
	console.log(`Current WorkflowStatus: ${await voting.workflowStatus()}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
