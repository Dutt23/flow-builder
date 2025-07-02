import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Image } from '@chakra-ui/react';

const ImageNode = ({ data, selected }) => {
  return (
    <Box 
      p={2} 
      borderRadius="md" 
      borderWidth={selected ? '2px' : '1px'}
      borderColor={selected ? 'blue.400' : 'gray.200'}
      bg="white"
      boxShadow={selected ? 'md' : 'sm'}
      minW="200px"
    >
      <Handle type="target" position={Position.Top} />
      <Box>
        {data.label && (
          <Box 
            bg="blue.50" 
            p={1} 
            mb={2} 
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
          >
            {data.label}
          </Box>
        )}
        {data.url ? (
          <Image 
            src={data.url} 
            alt={data.alt || 'Image Node'}
            maxW="100%"
            maxH="200px"
            objectFit="contain"
            borderRadius="md"
          />
        ) : (
          <Box 
            bg="gray.100" 
            h="100px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="md"
            color="gray.500"
          >
            No Image
          </Box>
        )}
      </Box>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default ImageNode;
