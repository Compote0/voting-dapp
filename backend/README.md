# Voting contract

We use solidity 0.8.20 compiler version.

## install hardhat
```shell
yarn
```

## libraries used
If you need to re-install libraries used
```shell
yarn add --dev "hardhat@^2.14.0" "@nomicfoundation/hardhat-toolbox@^3.0.0" "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@nomicfoundation/hardhat-ethers@^3.0.0" "@nomicfoundation/hardhat-verify@^1.0.0" "chai@^4.2.0" "ethers@^6.4.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.0" "@typechain/hardhat@^8.0.0" "typechain@^8.1.0" "@typechain/ethers-v6@^0.4.0"

yarn add --dev @openzeppelin/contracts
```

## compile contract
```shell
yarn hardhat compile
```

## test contract
```shell
yarn hardhat test
```

## run local blockchain
```shell
yarn hardhat node
```