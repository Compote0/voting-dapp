import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { describe, it } from "mocha";
import { chai } from "@nomicfoundation/hardhat-chai-matchers";
import { expect } from "chai";
chai.use(require("@nomicfoundation/hardhat-chai-matchers"));


const proposalName = "Proposal foo";

describe("Voting", () => {
	async function deployVotingContract() {
		const [owner, addr1, addr2] = await ethers.getSigners();

		const Voting = await ethers.getContractFactory("Voting");
		const voting: any = await Voting.deploy();

		return { voting, owner, addr1, addr2 };
	}

	describe("Deploy", () => {
		it("should set the owner to the right owner", async () => {
			const { voting, owner } = await loadFixture(deployVotingContract);

			expect(await voting.owner()).to.equal(owner.address);
		});
	});

	describe("WorkflowStatus", () => {
		describe("Revert", () => {
			it("should revert => proposals cant be started now", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await voting.startProposalsRegistering();
				await voting.endProposalsRegistering();

				await expect(voting.startProposalsRegistering()).to.be.revertedWith("Registering proposals cant be started now");
			});

			it("should revert => proposals havent started yet", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.endProposalsRegistering()).to.be.revertedWith("Registering proposals havent started yet");
			});

			it("should revert => proposals phase is not finished", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.startVotingSession()).to.be.revertedWith("Registering proposals phase is not finished");
			});

			it("should revert => session havent started yet", async () => {
				const { voting } = await loadFixture(deployVotingContract);

				await expect(voting.endVotingSession()).to.be.revertedWith("Voting session havent started yet");
			});
		});
	});
});
