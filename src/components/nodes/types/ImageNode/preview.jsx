import { Box, Image } from '@chakra-ui/react';

const ImageNodePreview = ({ data }) => {
  return (
    <Box 
      p={2} 
      borderRadius="md" 
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      boxShadow="sm"
      w="150px"
    >
      <Box fontSize="xs" fontWeight="medium" mb={1} textAlign="center">
        {data?.label || 'Image'}
      </Box>
      <Box 
        bg="gray.100" 
        h="60px" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        borderRadius="md"
        overflow="hidden"
      >
        {data?.url ? (
          <Image 
            src={data.url} 
            alt={data.alt || 'Preview'} 
            maxH="100%"
            maxW="100%"
            objectFit="contain"
          />
        ) : (
          <Box color="gray.500" fontSize="xs">No Image</Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageNodePreview;
