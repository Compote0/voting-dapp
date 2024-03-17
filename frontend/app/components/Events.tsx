import { Badge, Box, Circle, Flex, Heading, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { AddIcon, ArrowRightIcon, AttachmentIcon, DownloadIcon, SettingsIcon } from '@chakra-ui/icons';
import { useGlobalContext } from "../context/store";
import { Event } from "../types/event";

const displayIcon = (iconName: string) => {
  switch (iconName) {
    case "SettingsIcon": return <SettingsIcon />;
    case "AddIcon": return <AddIcon />;
    case "ArrowRightIcon": return <ArrowRightIcon />;
    case "DownloadIcon": return <DownloadIcon />;
    case "AttachmentIcon": return <AttachmentIcon />;
    default: return <SettingsIcon />;
  }
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
          {events.map((event: Event) => {
            return (
              <Flex key={crypto.randomUUID()} align="center">
                <Circle size='40px' bg='#417b5a' color='white' mr={4}>
                  {displayIcon(event.icon)}
                </Circle>
                <Box w="100%">
                  <Flex align="center">
                    <Heading size='xs' textTransform='uppercase' alignContent="center">
                      {event.title}
                    </Heading>
                    <Spacer />
                    <Badge>block #{event.blockNumber}</Badge>
                  </Flex>
                  <Text pt='2' fontSize='sm'>
                    {event.message}
                  </Text>
                </Box>
              </Flex>);
          })}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Events;
