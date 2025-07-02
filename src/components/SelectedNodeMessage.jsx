import { Box, Button, VStack, Text, Icon } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

export default function SelectedNodeMessage({ node, onBack }) {
  if (!node?.data) return null;

  return (
    <VStack spacing={4} p={4} align="stretch">
      <Button 
        leftIcon={<Icon as={FiArrowLeft} />} 
        variant="ghost" 
        onClick={onBack}
        alignSelf="flex-start"
        colorScheme="blue"
        size="sm"
        mb={2}
      >
        Back to Nodes
      </Button>
      
      <Box
        border="1px solid"
        borderColor="blue.200"
        borderRadius="md"
        p={4}
        bg="blue.50"
        color="blue.800"
      >
        <Text fontWeight="bold" mb={2}>
          {node.data.label || 'Selected Node'}
        </Text>
        {node.data.text && <Text fontSize="sm" mb={2}>{node.data.text}</Text>}
        <Text fontSize="xs" color="blue.600">
          ID: {node.id}
        </Text>
      </Box>
    </VStack>
  );
}
