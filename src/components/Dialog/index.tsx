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
                {type === 'info' && (
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="64" cy="64" r="64" fill="url(#paint0_linear)" />
                    <rect
                      x="72.5333"
                      y="102.4"
                      width="17.0667"
                      height="55.4667"
                      rx="8.53333"
                      transform="rotate(-180 72.5333 102.4)"
                      fill="white"
                    />
                    <rect
                      x="72.5333"
                      y="42.6667"
                      width="17.0667"
                      height="17.0667"
                      rx="8.53333"
                      transform="rotate(-180 72.5333 42.6667)"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="64"
                        y1="0"
                        x2="64"
                        y2="128"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#7BDDF0" />
                        <stop offset="1" stopColor="#96E1EC" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                {type === 'success' && (
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="64" cy="64" r="64" fill="url(#paint0_linear)" />
                    <path
                      d="M103.86 34.4376L46.7374 91.5604L20.7725 65.5955"
                      stroke="white"
                      strokeWidth="14.9333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="128"
                        x2="128"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#008256" />
                        <stop offset="1" stopColor="#00B78E" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                {type === 'warning' && (
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="64" cy="64" r="64" fill="url(#paint0_linear)" />
                    <rect
                      x="55.4667"
                      y="25.6"
                      width="17.0667"
                      height="55.4667"
                      rx="8.53333"
                      fill="white"
                    />
                    <rect
                      x="55.4667"
                      y="85.3333"
                      width="17.0667"
                      height="17.0667"
                      rx="8.53333"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="0"
                        y1="64"
                        x2="128"
                        y2="64"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFDB78" />
                        <stop offset="1" stopColor="#FABD5C" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                {type === 'danger' && (
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M43.8649 16.875C52.8138 1.37503 75.1862 1.375 84.1351 16.875L124.405 86.625C133.354 102.125 122.168 121.5 104.27 121.5H23.7298C5.83198 121.5 -5.3542 102.125 3.59473 86.625L43.8649 16.875Z"
                        fill="url(#paint0_linear)"
                      />
                      <rect
                        x="56.2499"
                        y="32.375"
                        width="15.5"
                        height="50.375"
                        rx="7.75"
                        fill="white"
                      />
                      <rect
                        x="56.2499"
                        y="86.625"
                        width="15.5"
                        height="15.5"
                        rx="7.75"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="29.125"
                        y1="40.125"
                        x2="115.344"
                        y2="126.344"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FE9C93" />
                        <stop offset="1" stopColor="#FC645B" />
                      </linearGradient>
                      <clipPath id="clip0">
                        <rect width="128" height="128" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}

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
