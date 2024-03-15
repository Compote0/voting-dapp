import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';

type VotingEvent = {
  icon: string;
  title: string;
  message: string;
  blockNumber: number;
}
const Events = () => {
  // use useGlobalContext to get the events list updated

  const events: VotingEvent[] = [
    { icon: "AddIcon", title: "Register Voter", message: "Address 0xabc.", blockNumber: 0 },
    { icon: "AddIcon", title: "Register Voter", message: "Address 0xabc.", blockNumber: 1 },
    { icon: "ArrowRightIcon", title: "Update Workflow", message: "Start proposal registration.", blockNumber: 2 },
    { icon: "AddIcon", title: "Register Proposal", message: "First proposal.", blockNumber: 3 },
    { icon: "AddIcon", title: "Register Proposal", message: "Second proposal.", blockNumber: 4 },
    { icon: "AddIcon", title: "Register Proposal", message: "Third proposal.", blockNumber: 5 },
    { icon: "AddIcon", title: "Register Proposal", message: "Fourth proposal.", blockNumber: 6 },
    { icon: "ArrowRightIcon", title: "Update Workflow", message: "Start voting session.", blockNumber: 7 },
    { icon: "AddIcon", title: "Vote", message: "Address 0xabc voted the proposal XYZ.", blockNumber: 8 },
  ]
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Events Report</Heading>
      </CardHeader>
      <CardBody maxH="400px" minW="300px" overflow='auto'>
        <Stack divider={<StackDivider />} spacing='4' >
          {events.map((event: VotingEvent) => {
            return (<Box key={crypto.randomUUID()}>
              <Heading size='xs' textTransform='uppercase' alignContent="center">
                {event.icon === "AddIcon" && <AddIcon />}
                {event.icon === "ArrowRightIcon" && <ArrowRightIcon />}
                {" "}
                {event.title}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {event.message}
              </Text>
            </Box>);
          })}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Events;
