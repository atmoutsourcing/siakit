import React, { ReactNode } from 'react';

import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Popover } from '../Popover';
import { Container, More, Hover } from './styles';

type AvatarGroupProps = {
  children: ReactNode[];
};

export function AvatarGroup({ children }: AvatarGroupProps): JSX.Element {
  return (
    <Container>
      {children?.length > 5 && (
        <Hover>
          <Popover>
            <More>
              <Heading size="md">+{children.length - 5}</Heading>
            </More>

            <Flex width={220} direction="column">
              {children.slice(5).map((item: any) => (
                <Flex key={item?.props.name} padding="8px 12px">
                  {item?.props.name}
                </Flex>
              ))}
            </Flex>
          </Popover>
        </Hover>
      )}

      {children?.length < 6
        ? children.map((item: any) => (
            <Hover key={item?.props.name}>{item}</Hover>
          ))
        : children
            .slice(0, 5)
            .map((item: any) => <Hover key={item?.props.name}>{item}</Hover>)}
    </Container>
  );
}
