import { Box, Flex, Text, Icon, Circle } from '@chakra-ui/react';
import { Handle, Position } from '@xyflow/react';
import { MdMessage } from 'react-icons/md';

export default function CustomNode({ data }) {
  return (
    <Box
      minW="320px"
      borderRadius="lg"
      boxShadow="0 2px 8px rgba(25, 118, 210, 0.10)"
      bg="white"
      border="1.5px solid #e3e6ea"
      position="relative"
      overflow="hidden"
    >
      <Flex align="center" px={5} pt={5} pb={2}>
        <Circle size="40px" bg="blue.100" color="blue.500" mr={3}>
          <Icon as={MdMessage} boxSize={6} />
        </Circle>
        <Text fontWeight="bold" fontSize="lg" color="gray.800">
          Send Message
        </Text>
      </Flex>
      <Box px={5} pb={5} color="gray.700" fontSize="md">
        {data.text}
      </Box>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#1976d2",
          width: 12,
          height: 12,
          borderRadius: "50%",
          top: "50%",
          border: "2px solid #fff",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#1976d2",
          width: 12,
          height: 12,
          borderRadius: "50%",
          top: "50%",
          border: "2px solid #fff",
        }}
      />
    </Box>
  );
}
