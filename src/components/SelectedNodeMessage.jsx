import { Box, Center, Text } from '@chakra-ui/react';

export default function SelectedNodeMessage({ node }) {
  if (!node?.data) return null;

  return (
    <Center width="100%">
      <Box
        border="2px solid"
        borderColor="green.400"
        borderRadius="lg"
        p={6}
        width="80%"
        textAlign="center"
        color="green.700"
        bg="green.50"
        fontSize="lg"
        mb={4}
        boxShadow="sm"
        userSelect="none"
      >
        <Text fontWeight="bold" mb={2}>
          Selected Node Message:
        </Text>
        <Text>{node.data.text}</Text>
      </Box>
    </Center>
  );
}
