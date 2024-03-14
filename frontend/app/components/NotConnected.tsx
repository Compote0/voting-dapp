'use client';
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { MdOutlineHowToVote } from "react-icons/md";

function NotConnected() {
	return (
		<Box textAlign="center" p="4">
			<Flex direction="column" justifyContent="center" alignItems="center" height="0vh">
				<Box mb="4">
					<Icon as={MdOutlineHowToVote} boxSize="50px" color="#417B5A" />
					<Heading as="h1" fontSize="4xl" mt="4" color="#E9D2C0">
						Welcome to the best Voting DApp on the Blockchain!
					</Heading>
					<Text fontSize="lg" mt="2" color="#E9D2C0">
						Please connect your wallet to continue.
					</Text>
				</Box>
			</Flex>
		</Box>
	)
}

export default NotConnected