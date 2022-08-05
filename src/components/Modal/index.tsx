import { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { HiOutlineX } from 'react-icons/hi';

import { IconButton } from '../IconButton';
import { Overlay, Content, ModalHeader, Size, Title } from './styles';

type ModalProps = {
  isOpen: boolean;
  onRequestClose?: () => void;
  title: string;
  size?: Size;
  children: ReactNode;
};

export function Modal({
  isOpen,
  onRequestClose,
  title,
  size = 'md',
  children,
}: ModalProps): JSX.Element {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onRequestClose ?? undefined}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Overlay>
            <Dialog.Content asChild>
              <Content size={size}>
                <ModalHeader>
                  <Dialog.Title asChild>
                    <Title>{title}</Title>
                  </Dialog.Title>

                  {onRequestClose && (
                    <Dialog.Close asChild>
                      <IconButton
                        type="button"
                        variant="ghost"
                        colorScheme="gray"
                        icon={<HiOutlineX />}
                      />
                    </Dialog.Close>
                  )}
                </ModalHeader>

                {children}
              </Content>
            </Dialog.Content>
          </Overlay>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
