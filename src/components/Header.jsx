import { Box, Text } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box
      width="100%"
      bg="gray.700"
      color="white"
      px={6}
      py={3}
      fontWeight="bold"
      fontSize="xl"
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      zIndex={100}
    >
      My Flow Editor
    </Box>
  );
}
