import * as RadixAccordion from '@radix-ui/react-accordion';
import styled from 'styled-components';

export const Accordion = styled(RadixAccordion.Root)`
  flex: 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  overflow: hidden;
`;

export const Item = styled(RadixAccordion.Item)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[6]};

  &:last-child {
    border-bottom: 0;
  }
`;

export const Header = styled(RadixAccordion.Header)`
  all: unset;
  display: flex;
`;

export const Title = styled(RadixAccordion.Trigger)`
  all: unset;

  height: 40px;
  padding: 0 16px;

  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.gray[9]};
  }

  &[data-state='closed'] {
  }

  &[data-state='open'] {
    p {
      font-weight: 600;
    }

    svg {
      transform: rotate(180deg);
      color: ${({ theme }) => theme.colors.gray[12]};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[4]};
  }
`;

export const Content = styled(RadixAccordion.Content)`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[6]};
`;
