import * as RadixTabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

export const Tabs = styled(RadixTabs.Root)`
  display: flex;
  flex-direction: column;
`;

export const TabList = styled(RadixTabs.List)`
  position: relative;
  display: flex;

  &:after {
    position: absolute;
    content: '';
    height: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.gray[4]};
  }
`;

export const TabPanel = styled(RadixTabs.Content)``;
