import { ethers } from "hardhat";

async function main() {
	const interaceName = "Voting";
	const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const [owner] = await ethers.getSigners();

	const voting = await (ethers as any).getContractAt(
		interaceName,
		CONTRACT_ADDRESS
	);

	// change the connect signer if owner is not a voter
	const proposalsArray = await voting.connect(owner).getProposals();

	if (proposalsArray.length === 0) {
		console.log("proposalsArray is empty");
	} else {
		for (let index = 0; index < proposalsArray.length; index++) {
			const currentProposal = proposalsArray[index];
			console.log(
				`Proposal n(${index}): ${currentProposal.description} - ${currentProposal.voteCount}`
			);
		}
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
