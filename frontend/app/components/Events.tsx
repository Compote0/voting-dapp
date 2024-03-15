import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';

type VotingEvent = {
  icon: string;
  title: string;
  message: string
}
const Events = () => {
  // use useGlobalContext to get the events list updated

  const events: VotingEvent[] = [
    { icon: "AddIcon", title: "Register Voter", message: "Address 0xabc." },
    { icon: "AddIcon", title: "Register Voter", message: "Address 0xabc." },
    { icon: "ArrowRightIcon", title: "Update Workflow", message: "Start proposal registration." },
    { icon: "AddIcon", title: "Register Proposal", message: "First proposal." },
    { icon: "AddIcon", title: "Register Proposal", message: "Second proposal." },
    { icon: "AddIcon", title: "Register Proposal", message: "Third proposal." },
    { icon: "AddIcon", title: "Register Proposal", message: "Fourth proposal." },
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
