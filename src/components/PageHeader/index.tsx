import { ReactNode } from 'react';

import { HiArrowLeft } from 'react-icons/hi';

import { Heading } from '../Heading';
import { Container } from './styles';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  onGoBack?: () => void;
}

export function PageHeader({
  title,
  children,
  onGoBack,
}: PageHeaderProps): JSX.Element {
  return (
    <Container>
      <div>
        {onGoBack && (
          <button type="button" onClick={onGoBack}>
            <HiArrowLeft />
          </button>
        )}

        <Heading size="md">{title}</Heading>
      </div>

      {children}
    </Container>
  );
}
