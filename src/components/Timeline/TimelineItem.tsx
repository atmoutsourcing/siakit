import React, { ReactNode } from 'react';

import { Avatar } from '../Avatar';
import { Card } from '../Card';
import { Container, AvatarContainer, Line, Content } from './styles';

type TimelineItemProps = {
  name: string;
  children: ReactNode;
  withLine?: boolean;
};

export function TimelineItem({
  name,
  children,
  withLine,
}: TimelineItemProps): JSX.Element {
  return (
    <Container>
      <AvatarContainer>
        <Avatar name={name} size="md" />

        {withLine && <Line />}
      </AvatarContainer>

      <Content>
        <Card>{children}</Card>
      </Content>
    </Container>
  );
}
