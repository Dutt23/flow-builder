import { Box, Center, Text } from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md';

export default function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Center width="100%">
      <Box
        as="div"
        draggable
        onDragStart={e => onDragStart(e, 'customNode')}
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
