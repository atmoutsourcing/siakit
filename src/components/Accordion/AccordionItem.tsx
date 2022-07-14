import { ReactNode } from 'react';

import { HiOutlineChevronDown } from 'react-icons/hi';

import { Flex } from '../Flex';
import { Text } from '../Text';
import { Item, Header, Title, Content } from './styles';

type AccordionItemProps = {
  title: string;
  value: string;
  children: ReactNode;
};

export function AccordionItem({
  title,
  value,
  children,
}: AccordionItemProps): JSX.Element {
  return (
    <Item value={value}>
      <Header>
        <Title>
          <Flex direction="column">
            <Text size="sm">{title}</Text>
          </Flex>

          <HiOutlineChevronDown size="14" />
        </Title>
      </Header>

      <Content>{children}</Content>
    </Item>
  );
}
