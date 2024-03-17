import { useEffect, useState } from 'react';
import { publicClient } from "@/app/utils/client";
import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { toHex } from 'viem';
import { contractAddress } from '@/app/constants'; 

const VerifyContractAddress = () => {
    const [isContractValid, setIsContractValid] = useState(true);

    useEffect(() => {
        const checkContractValidity = async () => {
            try {
                const data = await publicClient.getStorageAt({
                    address: `0x${contractAddress.replace(/^0x/, '')}`,
                    slot: toHex(0)
                });
                console.log("Data returned from getStorageAt:", data);
                setIsContractValid(data !== '0x' && data !== '0x0000000000000000000000000000000000000000000000000000000000000000');
            } catch (error) {
                console.error("Erreur lors de la vérification de l'adresse du contrat:", error);
                setIsContractValid(false);
            }
        };
        checkContractValidity();
    }, []);

    if (!isContractValid) {
        return (
            <Box p="4">
                <Alert status="error">
                    <AlertIcon />
                    L&apos;adresse du contrat est invalide ou le contrat n&apos;existe pas sur le réseau actuel.
                </Alert>
            </Box>
        );
    }

    return null;
};

export default VerifyContractAddress;
