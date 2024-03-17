import { useEffect, useState } from "react";
import { Alert, AlertIcon, Box, Button, Heading, Text } from "@chakra-ui/react";
import { publicClient } from "@/app/utils/client";
import React from "react";

const BlockchainStatus = () => {
    const [isBlockchainAccessible, setIsBlockchainAccessible] = useState(false);

    const checkBlockchainStatus = async () => {
        try {
            await publicClient.getBlockNumber();
            setIsBlockchainAccessible(true);
        } catch (e) {
            console.error("Blockchain is down or inaccessible:", e);
            setIsBlockchainAccessible(false);
        };
    };

    useEffect(() => {
        checkBlockchainStatus();
        const interval = setInterval(checkBlockchainStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!isBlockchainAccessible) {
        return (
            <Box p="4">
                <Alert status="error">
                    <AlertIcon />
                    <Heading size="md">Blockchain is down</Heading>
                    <Text>Please check your internet connection and try again. The blockchain may be offline.</Text>
                </Alert>
            </Box>
        )};
}

export default BlockchainStatus;