import * as RadixDialog from '@radix-ui/react-dialog';

import DangerIcon from '../../assets/icons/dialog/danger.svg';
import InfoIcon from '../../assets/icons/dialog/info.svg';
import SuccessIcon from '../../assets/icons/dialog/success.svg';
import WarningIcon from '../../assets/icons/dialog/warning.svg';
import { Colors } from '../../hooks/theme';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Overlay, Content } from './styles';

type Type = 'info' | 'success' | 'warning' | 'danger';

type DialogProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  description: string;
  type: Type;
  submitText: string;
  onSubmit: () => void;
  cancelText?: string;
};

export function Dialog({
  isOpen,
  onRequestClose,
  title,
  description,
  type,
  submitText,
  onSubmit,
  cancelText = 'Cancel',
}: DialogProps): JSX.Element {
  function buttonColorScheme(): Colors {
    if (type === 'success') {
      return 'green';
    }

    if (type === 'warning') {
      return 'amber';
    }

    if (type === 'danger') {
      return 'red';
    }

    return 'blue';
  }

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onRequestClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay>
          <Overlay>
            <RadixDialog.Content asChild>
              <Content>
                {type === 'info' && <img src={InfoIcon} alt="info" />}
                {type === 'success' && <img src={SuccessIcon} alt="success" />}
                {type === 'warning' && <img src={WarningIcon} alt="warning" />}
                {type === 'danger' && <img src={DangerIcon} alt="danger" />}

                <RadixDialog.Title asChild>
                  <Heading size="lg">{title}</Heading>
                </RadixDialog.Title>

                <RadixDialog.Description asChild>
                  <Text size="md">{description}</Text>
                </RadixDialog.Description>

                <Flex gap={8}>
                  <Button
                    type="button"
                    variant="secondary"
                    colorScheme="gray"
                    onClick={onRequestClose}
                  >
                    {cancelText}
                  </Button>

                  <Button
                    type="button"
                    colorScheme={buttonColorScheme()}
                    onClick={onSubmit}
                  >
                    {submitText}
                  </Button>
                </Flex>
              </Content>
            </RadixDialog.Content>
          </Overlay>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
