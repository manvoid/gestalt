import { Flex, Icon, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Icon accessibilityLabel="Number of views" color="default" icon="eye" />
        <Text size="300" weight="bold">
          4
        </Text>
      </Flex>
    </Flex>
  );
}
