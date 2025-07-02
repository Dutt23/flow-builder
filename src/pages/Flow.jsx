import { Flex, Box } from '@chakra-ui/react';
import FlowCanvas from '../components/FlowCanvas';
import NodesPanel from '../components/NodesPanel';
import SaveButton from '../components/SaveButton';

export default function Flow() {
  return (
    <Flex height="100vh" width="100vw" bg="#f7f8fa" position="relative" overflow="hidden">
      <Box flex="1" position="relative" width="calc(100% - 340px)">
        <FlowCanvas />
      </Box>
      <Box 
        width="340px" 
        bg="white" 
        borderLeft="1px solid #e3e6ea" 
        p={4}
        position="relative"
        height="100%"
        overflowY="auto"
      >
        <SaveButton />
        <NodesPanel />
      </Box>
    </Flex>
  );
}
