import { forwardRef, ReactNode } from 'react';

import { Card } from '../Card';
import { Flex } from '../Flex';

type DropdownContentProps = {
  children: ReactNode;
};

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Card ref={ref} {...rest}>
        <Flex padding="8px 0" direction="column" width={192}>
          {children}
        </Flex>
      </Card>
    );
  },
);
