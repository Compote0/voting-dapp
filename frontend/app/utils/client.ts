import { createPublicClient, http } from "viem";
import { sepolia } from "./sepolia";
// import { hardhat } from 'viem/chains'

export const publicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
});
