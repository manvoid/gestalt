import { Button, Flex, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="You need to fill in a username to create an account">
        <Button color="red" disabled size="lg" text="Create account" />
      </Tooltip>
    </Flex>
  );
}
