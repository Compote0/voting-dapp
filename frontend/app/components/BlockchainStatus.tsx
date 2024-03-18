import { useEffect, useState } from "react";
import { Alert, AlertIcon, Box, Button, Heading, Text } from "@chakra-ui/react";
import { publicClient } from "@/app/utils/client";
import React from "react";

const BlockchainStatus = () => {
    const [isBlockchainAccessible, setIsBlockchainAccessible] = useState(false);

    useEffect(() => {
        const checkBlockchainStatus = async () => {
            try {
                await publicClient.getBlockNumber();
                setIsBlockchainAccessible(true);
            } catch (e) {
                console.error("Blockchain is down or inaccessible:", e);
                setIsBlockchainAccessible(false);
            };
        };


        checkBlockchainStatus();

        const unwatch = publicClient.watchBlocks({
            onBlock: (block) => {
                console.log("BlockchainStatus-watchBlocks", block);
                setIsBlockchainAccessible(true);
            },
            onError: (error) => {
                console.error("Blockchain is down or inaccessible:", error);
                setIsBlockchainAccessible(false);
            }
        });

        const interval = setInterval(checkBlockchainStatus, 60000);

        return () => {
            unwatch();
            clearInterval(interval);
        };
    }, []);


    if (!isBlockchainAccessible) {
        return (
            <Box p="4">
                <Alert status="error">
                    <AlertIcon />
                    <Heading size="md" p='1'>Blockchain is down</Heading>
                    <Text p='1'>Please check your internet connection and try again. The blockchain may be offline.</Text>
                </Alert>
            </Box>
        )
    };
    return null;
}

export default BlockchainStatus;