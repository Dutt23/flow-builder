import { Box, Button, VStack, Icon } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { TextNodeEditor, DefaultNodeEditor } from './editors';

export default function SelectedNodeMessage({ node, onBack, onNodeUpdate }) {
  if (!node?.data) return null;

  // Determine which editor to use based on node type
  const renderEditor = () => {
    if (node.data.type === 'text') {
      return (
        <TextNodeEditor 
          node={node} 
          onUpdate={onNodeUpdate} 
        />
      );
    }
    
    // Default editor for other node types
    return <DefaultNodeEditor node={node} />;
  };

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
      >
        {renderEditor()}
      </Box>
    </VStack>
  );
}
