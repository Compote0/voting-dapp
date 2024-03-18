import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Proposals from './Proposals';
import SearchVoter from './SearchVoter';

interface VotingStatusProps {
    canVote: boolean;
}

const VotingStatus = ({ canVote }: VotingStatusProps) => {
    return (
        <Tabs variant='soft-rounded'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: '#D0CEBA' }} color='#D0CEBA'>Proposals</Tab>
                <Tab _selected={{ color: 'white', bg: '#D0CEBA' }} color='#D0CEBA'>Search Voter</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Proposals canVote={canVote} />
                </TabPanel>
                <TabPanel>
                    <SearchVoter />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default VotingStatus;
