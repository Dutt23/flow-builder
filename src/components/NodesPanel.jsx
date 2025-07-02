import { Box, Center, Text } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';
import SelectedNodeMessage from './SelectedNodeMessage';

export default function NodesPanel({ selectedNode }) {
  if (selectedNode) {
    return <SelectedNodeMessage node={selectedNode} />;
  }

  // Default draggable card
  return (
    <Center width="100%">
      <Box
        as="div"
        draggable
        onDragStart={e => {
          e.dataTransfer.setData('application/reactflow', 'customNode');
          e.dataTransfer.effectAllowed = 'move';
        }}
        border="2px solid"
        borderColor="blue.400"
        borderRadius="lg"
        p={6}
        width="80%"
        textAlign="center"
        cursor="grab"
        color="blue.600"
        bg="white"
        fontSize="lg"
        mb={4}
        boxShadow="sm"
        userSelect="none"
      >
        <Center mb={2}>
          <MdMessage size={32} />
        </Center>
        <Text fontWeight="semibold">Message</Text>
      </Box>
    </Center>
  );
}
