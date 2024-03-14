import { Heading, Text } from '@chakra-ui/react';
import { useGlobalContext } from '../context/store';

export const RegisterVoter = () => {
  const { isOwner } = useGlobalContext();

  return (
    <>
      <Heading>Register Voter</Heading>
      {isOwner ? (
        <Text>Please proceed to voter registration</Text>
        /* TODO: input for voter address and submit button to trigger addVoter function of the contract */
      ) : (
        <Text>The owner is currently in the process of registering voters</Text>
      )}
    </>
  );
};
