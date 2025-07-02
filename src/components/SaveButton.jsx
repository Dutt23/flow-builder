import { Button } from '@chakra-ui/react';

export default function SaveButton() {
  return (
    <Button
      colorScheme="blue"
      variant="outline"
      mb={8}
      size="lg"
      width="90%"
      fontWeight="bold"
      onClick={() => alert('Changes saved!')}
    >
      Save Changes
    </Button>
  );
}
