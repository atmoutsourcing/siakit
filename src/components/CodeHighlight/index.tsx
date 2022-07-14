import { ReactNode } from 'react';

import { Container } from './styles';

type CodeHighlightProps = {
  children: ReactNode;
};

export function CodeHighlight({ children }: CodeHighlightProps): JSX.Element {
  return (
    <Container>
      <pre>
        <code>{children}</code>
      </pre>
    </Container>
  );
}
