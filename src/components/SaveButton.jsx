import { Button } from '@chakra-ui/react';

export default function SaveButton({ size = 'sm' }) {
  return (
    <Button
      colorScheme="blue"
      variant="outline"
      size={size}
      fontSize={size === 'sm' ? 'xs' : 'sm'}
      px={size === 'sm' ? 3 : 4}
      fontWeight="medium"
      onClick={() => alert('Changes saved!')}
    >
      Save Changes
    </Button>
  );
}
