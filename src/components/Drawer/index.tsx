import { ReactNode } from 'react';

import { HiOutlineX } from 'react-icons/hi';

import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';
import { Container, Size } from './styles';

type DrawerProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  size?: Size;
};

export function Drawer({
  children,
  open,
  onOpenChange,
  title,
  size = 'sm',
}: DrawerProps): JSX.Element {
  function handleClose(): void {
    onOpenChange(false);
  }

  if (!open) {
    return <></>;
  }

  return (
    <Container direction="column" size={size}>
      <Flex justify="space-between" padding={8} align="center">
        <Heading size="md">{title}</Heading>

        <IconButton
          type="button"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineX />}
          onClick={handleClose}
        />
      </Flex>

      {children}
    </Container>
  );
}
