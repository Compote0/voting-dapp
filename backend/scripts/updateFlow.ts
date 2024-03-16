import { ethers } from "hardhat";

async function main() {
	const interaceName = "Voting";
	const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const [owner] = await ethers.getSigners();

	// get voting contrat deployed
	const voting = await ethers.getContractAt(interaceName, CONTRACT_ADDRESS);

	// --- step 1 - add owner as voter
	// comment if voter already added
	await voting.connect(owner).addVoter(owner.address);

	// --- step 2 - start proposal registration
	// comment if already at startProposalsRegistering wotkflow
	await voting.connect(owner).startProposalsRegistering();

	// --- step 3 - display proposal tab
	// comment if dont want more proposal
	await voting.connect(owner).addProposal("first proposal");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
