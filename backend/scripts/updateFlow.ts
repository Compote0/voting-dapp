import { ethers } from "hardhat";

async function main() {
	const interaceName = "Voting";
	const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const [owner] = await ethers.getSigners();

	// get voting contrat deployed
	const voting = await (ethers as any).getContractAt(
		interaceName,
		CONTRACT_ADDRESS
	);

	// --- step 1 - add owner as voter
	// comment if voter already added
	await voting.connect(owner).addVoter(owner.address);

	// --- step 2 - start proposal registration
	// comment if already at startProposalsRegistering wotkflow
	await voting.connect(owner).startProposalsRegistering();

	// --- step 3 - display proposal tab
	// comment if dont want more proposal
	await voting.connect(owner).addProposal("first proposal");

	// --- step 4 - end proposal registration
	// comment if already at endProposalsRegistering wotkflow
	await voting.connect(owner).endProposalsRegistering();

	// --- step 5 - start voting session
	// comment if already at startVotingSession wotkflow
	await voting.connect(owner).startVotingSession();

	// --- step 5 - voting session
	// comment if already at voted
	await voting.connect(owner).setVote(1);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
