import { Badge, Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useGlobalContext } from "../context/store";

export type VotingEvent = {
  icon: string;
  title: string;
  message: string;
  blockNumber: number;
}

const Events = () => {
  const { events } = useGlobalContext();

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
                <Badge>{event.blockNumber}</Badge>
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
