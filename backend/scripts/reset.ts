import { ethers } from "hardhat";

async function main() {
	const interaceName = "Voting";
	const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

	const voting = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	const [owner, addr1, addr2, addr3] = await ethers.getSigners();

	// can be used at any time only by owner
	await voting.reset();
	console.log(
		"Voting contract has been reseted (WorkflowStatus, ProposalArray, winningProposalID)."
	);
	console.log(`Current WorkflowStatus: ${await voting.workflowStatus()}`);

	// --- list the address you want to reset as a voter
	// can only be done at RegisteringVoters workflow
	// comment those line if no need to reset voters
	const voters = [owner, addr1, addr2, addr3];
	voters.forEach(async (voter) => {
		await voting.resetVoter(voter.address);
	});
	console.log("Voters has been unregistered");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
