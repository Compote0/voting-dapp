// const { assert, expect } = require("chai");
// const { ethers } = require("hardhat");
import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";


describe("Voting Tests", function () {

	async function deployVotingContract() {
		// 4 signer different
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const Voting = await ethers.getContractFactory("Voting");
		// le contrat
        const voting = await Voting.deploy();

        return { voting, owner, addr1, addr2, addr3 };
	}

	describe("initiation", function () {
		it("should deploy the SM", async function () {
			const { voting, owner } = await loadFixture(deployVotingContract);

			let theOwner = await voting.owner();

			assert.equal(owner.address, theOwner);
		});
		it("should be in RegisteringVoters workflow status", async function () {
			const { voting } = await loadFixture(deployVotingContract);

			assert.equal(await voting.workflowStatus(), 0);
		});
		it("should be winningProposalID with default value 0", async function () {
			const { voting } = await loadFixture(deployVotingContract);

			expect(await voting.winningProposalID()).to.equal(0);
		});
	});

	describe("getter", function () {
		describe("getVoter", function () {
			it("should revert when not a voter", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(owner).getVoter(addr1)).to.be.revertedWith(
					"You're not a voter"
				);
			});
			it("should return an unregistered voter", async function () {
				const { voting, owner, addr1, addr2 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				const [isRegistered, hasVoted, votedProposalId] = await voting
					.connect(addr1)
					.getVoter(addr2);

				assert.equal(isRegistered, false);
				assert.equal(hasVoted, false);
				assert.equal(votedProposalId, 0);
			});
			it("should return a registered voter", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				const [isRegistered, hasVoted, votedProposalId] = await voting
					.connect(addr1)
					.getVoter(addr1);

				assert.equal(isRegistered, true);
				assert.equal(hasVoted, false);
				assert.equal(votedProposalId, 0);
			});
		});
		describe("getOneProposal", function () {
			it("should revert when not a voter", async function () {
				const { voting, owner } = await loadFixture(deployVotingContract);

				await expect(
					voting.connect(owner).getOneProposal(0)
				).to.be.revertedWith("You're not a voter");
			});
			it("should return GENESIS proposal", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();

				const [description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(0);
				assert.equal(description, "GENESIS");
				assert.equal(voteCount, 0);
			});
			it("should return a first proposal", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(addr1).addProposal("first proposal");

				const [description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(1);
				assert.equal(description, "first proposal");
				assert.equal(voteCount, 0);
			});
		});
		describe("getProposals", function () {
			it("should return a tab of proposals", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				expect((await voting.connect(addr1).getProposals()).length).to.be.equal(
					0
				);

				await voting.connect(owner).startProposalsRegistering();
				expect((await voting.connect(addr1).getProposals()).length).to.be.equal(
					1
				);

				await voting.connect(addr1).addProposal("first proposal");
				expect((await voting.connect(addr1).getProposals()).length).to.be.equal(
					2
				);
			});
		});
	});

	describe("actions", function () {
		describe("addVoter", function () {
			it("should revert when not owner", async function () {
				const { voting, addr1, addr2 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(addr1).addVoter(addr2))
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
			});
			it("should revert when workflow status is not RegisteringVoters", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).startProposalsRegistering();

				await expect(voting.connect(owner).addVoter(addr1)).to.be.revertedWith(
					"Voters registration is not open yet"
				);
			});
			it("should revert when voter is already registered", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);
				
				voting.connect(owner).addVoter(addr1);

				await expect(voting.connect(owner).addVoter(addr1)).to.be.revertedWith(
					"Already registered"
				);
			});
			it("should register voter", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(owner).addVoter(addr1))
					.to.emit(voting, "VoterRegistered")
					.withArgs(addr1.address);

				const [isRegistered, hasVoted, votedProposalId] = await voting
					.connect(addr1)
					.getVoter(addr1);

				assert.equal(isRegistered, true);
				assert.equal(hasVoted, false);
				assert.equal(votedProposalId, 0);
			});
		});

		describe("addProposal", function () {
			it("should revert when not a voter", async function () {
				const { voting, addr1} = await loadFixture(deployVotingContract);

				await expect(
					voting.connect(addr1).addProposal("I am not a voter")
				).to.be.revertedWith("You're not a voter");
			});
			it("should revert when workflow status is not ProposalsRegistrationStarted", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);

				await expect(
					voting.connect(addr1).addProposal("I am a voter")
				).to.be.revertedWith("Proposals are not allowed yet");
			});
			it("should revert when proposal description is empty", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();

				await expect(voting.connect(addr1).addProposal("")).to.be.revertedWith(
					"Vous ne pouvez pas ne rien proposer"
				);
			});
			it("should revert when adding a 5th proposal", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();

				await voting.connect(addr1).addProposal("My first proposal");
				await voting.connect(addr1).addProposal("My second proposal");
				await voting.connect(addr1).addProposal("My thrid proposal");
				await voting.connect(addr1).addProposal("My fourth proposal");
				await expect(
					voting.connect(addr1).addProposal("My fifth proposal")
				).to.be.revertedWith("Maximum proposals slot reached");
			});
			it("should register proposal", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();

				await expect(voting.connect(addr1).addProposal("My first proposal"))
					.to.emit(voting, "ProposalRegistered")
					.withArgs(1);

				const [description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(1);

				assert.equal(description, "My first proposal");
				assert.equal(voteCount, 0);
			});
		});

		describe("setVote", function () {
			it("should revert when not a voter", async function () {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				await expect(voting.connect(addr1).setVote(0)).to.be.revertedWith(
					"You're not a voter"
				);
			});
			it("should revert when workflow status is not VotingSessionStarted", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);

				await expect(voting.connect(addr1).setVote(1)).to.be.revertedWith(
					"Voting session havent started yet"
				);
			});
			it("should revert when voter has already voted", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(addr1).addProposal("My first proposal");
				await voting.connect(owner).endProposalsRegistering();
				await voting.connect(owner).startVotingSession();
				await voting.connect(addr1).setVote(1);

				const [isRegistered, hasVoted, votedProposalId] = await voting
					.connect(addr1)
					.getVoter(addr1);

				assert.equal(isRegistered, true);
				assert.equal(hasVoted, true);
				assert.equal(votedProposalId, 1);

				let [description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(1);
				assert.equal(description, "My first proposal");
				assert.equal(voteCount, 1);

				await expect(voting.connect(addr1).setVote(0)).to.be.revertedWith(
					"You have already voted"
				);

				[description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(1);
				assert.equal(description, "My first proposal");
				assert.equal(voteCount, 1);
			});
			it("should revert when voter vote for a proposal that does not exist", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(owner).endProposalsRegistering();
				await voting.connect(owner).startVotingSession();

				await expect(voting.connect(addr1).setVote(1)).to.be.revertedWith(
					"Proposal not found"
				);
			});
			it("should vote for proposal", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).addVoter(addr1);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(addr1).addProposal("My first proposal");
				await voting.connect(owner).endProposalsRegistering();
				await voting.connect(owner).startVotingSession();

				await expect(voting.connect(addr1).setVote(1))
					.to.emit(voting, "Voted")
					.withArgs(addr1.address, 1);

				const [isRegistered, hasVoted, votedProposalId] = await voting
					.connect(addr1)
					.getVoter(addr1);

				assert.equal(isRegistered, true);
				assert.equal(hasVoted, true);
				assert.equal(votedProposalId, 1);

				const [description, voteCount] = await voting
					.connect(addr1)
					.getOneProposal(1);
				assert.equal(description, "My first proposal");
				assert.equal(voteCount, 1);
			});
		});
	});

	describe("state", function () {
		describe("state onlyOwner", function () {
			it("should revert when not owner to startProposalsRegistering", async function () {
				const { voting, addr1 } = await loadFixture(deployVotingContract);
				
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(addr1).startProposalsRegistering())
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not owner to endProposalsRegistering", async function () {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(addr1).endProposalsRegistering())
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not owner to startVotingSession", async function () {
				const { voting, addr1} = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(addr1).startVotingSession())
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not owner to endVotingSession", async function () {
				const { voting, addr1} = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(addr1).endVotingSession())
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not owner to tallyVotes", async function () {
				const { voting, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(addr1).tallyVotes())
					.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
					.withArgs(addr1.address);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
		});

		describe("state wrong order", function () {
			it("should revert when not good workflow status required to startProposalsRegistering", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				await voting.connect(owner).startProposalsRegistering();
				expect(await voting.connect(addr1).workflowStatus()).to.equal(1);
				await expect(
					voting.connect(owner).startProposalsRegistering()
				).to.revertedWith("Registering proposals cant be started now");
				expect(await voting.connect(addr1).workflowStatus()).to.equal(1);
			});
			it("should revert when not good workflow status required to endProposalsRegistering", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(
					voting.connect(owner).endProposalsRegistering()
				).to.revertedWith("Registering proposals havent started yet");
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not good workflow status required to startVotingSession", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(
					voting.connect(owner).startVotingSession()
				).to.revertedWith("Registering proposals phase is not finished");
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not good workflow status required to endVotingSession", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(owner).endVotingSession()).to.revertedWith(
					"Voting session havent started yet"
				);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
			it("should revert when not good workflow status required to tallyVotes", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(owner).tallyVotes()).to.revertedWith(
					"Current status is not voting session ended"
				);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
			});
		});

		describe("state good order", function () {
			it("should workflow status change to ProposalsRegistrationStarted", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await expect(voting.connect(owner).startProposalsRegistering())
					.to.emit(voting, "WorkflowStatusChange")
					.withArgs(0, 1);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(1);
			});
			it("should workflow status change to ProposalsRegistrationEnded", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await voting.connect(owner).startProposalsRegistering();

				await expect(voting.connect(owner).endProposalsRegistering())
					.to.emit(voting, "WorkflowStatusChange")
					.withArgs(1, 2);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(2);
			});
			it("should workflow status change to VotingSessionStarted", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(owner).endProposalsRegistering();

				await expect(voting.connect(owner).startVotingSession())
					.to.emit(voting, "WorkflowStatusChange")
					.withArgs(2, 3);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(3);
			});
			it("should workflow status change to VotingSessionEnded", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(owner).endProposalsRegistering();
				await voting.connect(owner).startVotingSession();

				await expect(voting.connect(owner).endVotingSession())
					.to.emit(voting, "WorkflowStatusChange")
					.withArgs(3, 4);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(4);
			});
			it("should workflow status change to VotesTallied", async function () {
				const { voting, owner, addr1 } = await loadFixture(deployVotingContract);

				expect(await voting.connect(addr1).workflowStatus()).to.equal(0);
				await voting.connect(owner).startProposalsRegistering();
				await voting.connect(owner).endProposalsRegistering();
				await voting.connect(owner).startVotingSession();
				await voting.connect(owner).endVotingSession();

				await expect(voting.connect(owner).tallyVotes())
					.to.emit(voting, "WorkflowStatusChange")
					.withArgs(4, 5);
				expect(await voting.connect(addr1).workflowStatus()).to.equal(5);
			});
		});
	});

	describe("tallyVotes", function () {

		it("should have the GENESIS proposal win when no proposal done and no vote done", async function () {
			const { voting, owner, addr1, addr2 } = await loadFixture(deployVotingContract);

			await voting.connect(owner).addVoter(addr1.address);
			await voting.connect(owner).startProposalsRegistering();
			await voting.connect(owner).endProposalsRegistering();
			await voting.connect(owner).startVotingSession();
			await voting.connect(owner).endVotingSession();
			await voting.connect(owner).tallyVotes();

			const winningProposalID = await voting.connect(owner).winningProposalID();
			assert.equal(winningProposalID, 0);

			const [description, voteCount] = await voting
				.connect(addr1)
				.getOneProposal(0);
			assert.equal(description, "GENESIS");
			assert.equal(voteCount, 0);
		});
		it("should have the GENESIS proposal win when no proposal done and vote for it", async function () {
			const { voting, owner, addr1, addr2 } = await loadFixture(deployVotingContract);

			await voting.connect(owner).addVoter(addr1.address);
			await voting.connect(owner).addVoter(addr2.address);
			await voting.connect(owner).startProposalsRegistering();
			await voting.connect(owner).endProposalsRegistering();
			await voting.connect(owner).startVotingSession();
			await voting.connect(addr1).setVote(0);
			await voting.connect(addr2).setVote(0);
			await voting.connect(owner).endVotingSession();
			await voting.connect(owner).tallyVotes();

			const winningProposalID = await voting.connect(owner).winningProposalID();
			assert.equal(winningProposalID, 0);

			const [description, voteCount] = await voting
				.connect(addr1)
				.getOneProposal(0);
			assert.equal(description, "GENESIS");
			assert.equal(voteCount, 2);
		});
		it("should have the GENESIS proposal win when one proposal done and vote are same 1-1", async function () {
			const { voting, owner, addr1, addr2 } = await loadFixture(deployVotingContract);

			await voting.connect(owner).addVoter(addr1.address);
			await voting.connect(owner).addVoter(addr2.address);
			await voting.connect(owner).startProposalsRegistering();
			await voting.connect(addr1).addProposal("My first proposal");
			await voting.connect(owner).endProposalsRegistering();
			await voting.connect(owner).startVotingSession();
			await voting.connect(addr1).setVote(0);
			await voting.connect(addr2).setVote(1);
			await voting.connect(owner).endVotingSession();
			await voting.connect(owner).tallyVotes();

			const winningProposalID = await voting.connect(owner).winningProposalID();
			assert.equal(winningProposalID, 0);

			let [description, voteCount] = await voting
				.connect(addr1)
				.getOneProposal(0);
			assert.equal(description, "GENESIS");
			assert.equal(voteCount, 1);

			[description, voteCount] = await voting.connect(addr1).getOneProposal(1);
			assert.equal(description, "My first proposal");
			assert.equal(voteCount, 1);
		});
		it("should have the first proposal win when one proposal done and vote for it 0-2", async function () {
			const { voting, owner, addr1, addr2 } = await loadFixture(deployVotingContract);

			await voting.connect(owner).addVoter(addr1.address);
			await voting.connect(owner).addVoter(addr2.address);
			await voting.connect(owner).startProposalsRegistering();
			await voting.connect(addr1).addProposal("My first proposal");
			await voting.connect(owner).endProposalsRegistering();
			await voting.connect(owner).startVotingSession();
			await voting.connect(addr1).setVote(1);
			await voting.connect(addr2).setVote(1);
			await voting.connect(owner).endVotingSession();
			await voting.connect(owner).tallyVotes();

			const winningProposalID = await voting.connect(owner).winningProposalID();
			assert.equal(winningProposalID, 1);

			let [description, voteCount] = await voting
				.connect(addr1)
				.getOneProposal(0);
			assert.equal(description, "GENESIS");
			assert.equal(voteCount, 0);

			[description, voteCount] = await voting.connect(addr1).getOneProposal(1);
			assert.equal(description, "My first proposal");
			assert.equal(voteCount, 2);
		});
	});

	describe("transaction with no receive/fallback function", function () {
		it("shoud revert when send eth to the contract", async function () {
			const { voting, owner } = await loadFixture(deployVotingContract);

			const etherQuantity = ethers.parseEther("1.0");

			try {
				await expect(
					voting
						.connect(owner)
						.startProposalsRegistering({ value: etherQuantity })
				);
				// If no exception is thrown, fail the test
				expect.fail(
					"Expected an exception for sending Ether to a non-payable contract"
				);
			} catch (error: any) {
				// Check if the error message or type is as expected
				expect(error.message).to.contain("non-payable");
			}
		});
	});

	// TEST: reset function
	describe("reset", function () {
		it("should revert when called by non-owner", async function () {
			const { voting, addr1 } = await loadFixture(deployVotingContract);
			await expect(voting.connect(addr1).reset())
				.to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount")
				.withArgs(addr1.address);
		});
	
		it("should reset the contract to initial state", async function () {
			const { voting, owner, addr1 } = await loadFixture(deployVotingContract);
		
			// Setup initial state
			await voting.connect(owner).addVoter(addr1.address);
			await voting.connect(owner).startProposalsRegistering();
			await voting.connect(addr1).addProposal("A valid proposal");
			await voting.connect(owner).endProposalsRegistering();
			await voting.connect(owner).startVotingSession();
			await voting.connect(addr1).setVote(1);
			await voting.connect(owner).endVotingSession();
			await voting.connect(owner).tallyVotes();
		
			// Reset the contract
			await voting.connect(owner).reset();
		
			// Verify contract state is reset
			expect(await voting.winningProposalID()).to.equal(0);
			expect(await voting.workflowStatus()).to.equal(0); // Assuming 0 is RegisteringVoters
		});		
	});
});	
