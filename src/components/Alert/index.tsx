import {
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineShieldExclamation,
} from 'react-icons/hi';

import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Type, Container } from './styles';

type AlertProps = {
  type: Type;
  title: string;
  text?: string;
};

export function Alert({ type, title, text }: AlertProps): JSX.Element {
  return (
    <Container type={type}>
      {type === 'info' && <HiOutlineInformationCircle size={16} />}
      {type === 'success' && <HiOutlineCheckCircle size={16} />}
      {type === 'warning' && <HiOutlineExclamation size={16} />}
      {type === 'danger' && <HiOutlineShieldExclamation size={16} />}

      <Flex direction="column">
        <Heading size="sm">{title}</Heading>

        {text && <Text size="sm">{text}</Text>}
      </Flex>
    </Container>
  );
}
