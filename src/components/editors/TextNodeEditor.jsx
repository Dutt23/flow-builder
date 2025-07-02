import { Textarea, VStack, Text } from '@chakra-ui/react';

export default function TextNodeEditor({ node, onUpdate }) {
  const handleTextChange = (e) => {
    if (onUpdate) {
      onUpdate({
        ...node,
        data: {
          ...node.data,
          text: e.target.value
        }
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="sm" fontWeight="medium">Message</Text>
      <Textarea
        value={node.data.text || ''}
        onChange={handleTextChange}
        placeholder="Enter your message..."
        minH="120px"
        size="sm"
        resize="vertical"
      />
    </VStack>
  );
}
