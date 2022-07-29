import { Flex } from '../Flex';
import { Text } from '../Text';
import { usePageBuilderStore } from './stores/pageBuilder';

export function PageBuilderForm(): JSX.Element {
  const config = usePageBuilderStore((state) => state.config);

  console.log(config);

  return (
    <Flex>
      <Text>page builder form</Text>
    </Flex>
  );
}
