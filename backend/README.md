# Voting contract

We use solidity 0.8.20 compiler version.

## setup environment variable

You need to have a .env file with the following properties

- PRIVATE_KEY
- SEPOLIA_RPC_URL
- ETHERSCAN_API_KEY

## install

```shell
yarn
```

### libraries used

If you need to re-install libraries used

```shell
yarn add --dev "hardhat@^2.14.0" "@nomicfoundation/hardhat-toolbox@^3.0.0" "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@nomicfoundation/hardhat-ethers@^3.0.0" "@nomicfoundation/hardhat-verify@^1.0.0" "chai@^4.2.0" "ethers@^6.4.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.0" "@typechain/hardhat@^8.0.0" "typechain@^8.1.0" "@typechain/ethers-v6@^0.4.0"

yarn add --dev @openzeppelin/contracts
```

## yarn commands

### custom commands

You can execute the following commands from scripts in package.json

```shell
yarn run compile
yarn run test
yarn run coverage
yarn run node
yarn run deploy-ll # deploy on local network
yarn run deploy-se # deploy on sepolia network
yarn run reset-ll # reset contract values on local network
yarn run reset-se # reset contract values on sepolia network
```

### manual commands

#### compile contract

```shell
yarn hardhat compile
```

#### test contract

```shell
yarn hardhat test
```

#### run local blockchain

```shell
yarn hardhat node
```

#### deploy contract

```shell
yarn hardhat run ./scripts/deploy.ts --network localhost

yarn hardhat run ./scripts/deploy.ts --network sepolia
```

## Tests

### Hardhat address

- contractAddress: 0x5FbDB2315678afecb367f032d93F642f64180aa3
- wallet address 1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
- wallet address 2: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
- wallet address 3: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
- wallet address 4: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
- wallet address 5: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65

### Coverage

- initiation
  - should deploy the SM
  - should be in RegisteringVoters workflow status
  - should be winningProposalID with default value 0
- getter
  - getVoter
    - should revert when not a voter
    - should return an unregistered voter
    - should return a registered voter
  - getOneProposal
    - should revert when not a voter
    - should return GENESIS proposal
    - should return a first proposal
  - getProposals
    - should return a tab of proposals (43ms)
- actions
  - addVoter
    - should revert when not owner
    - should revert when workflow status is not RegisteringVoters
    - should revert when voter is already registered
    - should register voter
  - addProposal
    - should revert when not a voter
    - should revert when workflow status is not ProposalsRegistrationStarted
    - should revert when proposal description is empty
    - should revert when adding a 5th proposal (55ms)
    - should register proposal
  - setVote
    - should revert when not a voter
    - should revert when workflow status is not VotingSessionStarted
    - should revert when voter has already voted (54ms)
    - should revert when voter vote for a proposal that does not exist
    - should vote for proposal (47ms)
- state
  - state onlyOwner
    - should revert when not owner to startProposalsRegistering
    - should revert when not owner to endProposalsRegistering
    - should revert when not owner to startVotingSession
    - should revert when not owner to endVotingSession
    - should revert when not owner to tallyVotes
  - state wrong order
    - should revert when not good workflow status required to startProposalsRegistering
    - should revert when not good workflow status required to endProposalsRegistering
    - should revert when not good workflow status required to startVotingSession
    - should revert when not good workflow status required to endVotingSession
    - should revert when not good workflow status required to tallyVotes
  - state good order
    - should workflow status change to ProposalsRegistrationStarted
    - should workflow status change to ProposalsRegistrationEnded
    - should workflow status change to VotingSessionStarted
    - should workflow status change to VotingSessionEnded
    - should workflow status change to VotesTallied
  - tallyVotes
    - should have the GENESIS proposal win when no proposal done and no vote done
    - should have the GENESIS proposal win when no proposal done and vote for it
    - should have the GENESIS proposal win when one proposal done and vote are same 1-1 (49ms)
    - should have the first proposal win when one proposal done and vote for it 0-2 (49ms)
      transaction with no receive/fallback function
    - shoud revert when send eth to the contract

44 passing (2s)

| File          | % Stmts    | % Branch   | % Funcs    | % Lines    | Uncovered Lines  |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------------- |
| contracts\    | 100        | 100        | 100        | 100        |                  |
| voting.sol    | 100        | 100        | 100        | 100        |                  |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------------- |
| All files     | 100        | 100        | 100        | 100        |                  |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------------- |
