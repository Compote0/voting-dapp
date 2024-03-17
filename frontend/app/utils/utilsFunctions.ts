export function shortenAddress(address: `0x${string}` | undefined): string {
	if (address === undefined) return "undefined";

	if (address.length === 0) {
		return "wallet address length is 0";
	} else {
		const firstPart = address.substring(0, 4);
		const lastPart = address.substring(address.length - 4);

		return `${firstPart}...${lastPart}`;
	}
}
