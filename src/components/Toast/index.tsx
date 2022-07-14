import {
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineShieldExclamation,
} from 'react-icons/hi';
import {
  ToastContainer,
  toast as reactToast,
  ToastOptions,
} from 'react-toastify';
import styled, { useTheme } from 'styled-components';

import { Colors } from '../../hooks/theme';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Flex } from '../Flex';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    z-index: 9999;
  }

  .Toastify__toast {
    background-color: ${({ theme }) => theme.colors.cardBackground};
  }

  .Toastify__toast-icon {
    display: none;
  }
  .Toastify__close-button {
    color: ${({ theme }) => theme.colors.gray[11]};
  }

  .Toastify__progress-bar {
    height: 4px;
  }

  .Toastify__progress-bar--info {
    background-color: ${({ theme }) => theme.colors.blue[11]};
  }
  .Toastify__progress-bar--success {
    background-color: ${({ theme }) => theme.colors.green[11]};
  }
  .Toastify__progress-bar--warning {
    background-color: ${({ theme }) => theme.colors.amber[11]};
  }
  .Toastify__progress-bar--error {
    background-color: ${({ theme }) => theme.colors.red[11]};
  }
`;

const ToastTitle = styled.strong`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[12]};
`;
const ToastText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[11]};
`;

type Action = {
  label: string;
  action: string;
  backend: boolean;
};

type CustomToastData = {
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  timeout: number;
  urgent: boolean;
  actions: Action[];
};

type Type = 'info' | 'success' | 'warning' | 'danger';

type RenderIconTitleAndTextProps = {
  type: Type;
  title: string;
  text: string;
  urgent?: boolean;
  actions?: Action[];
};

function RenderIconTitleAndText({
  type,
  title,
  text,
  urgent,
  actions,
}: RenderIconTitleAndTextProps): JSX.Element {
  const theme = useTheme();

  function buttonColorScheme(): Colors {
    if (urgent) {
      return 'gray';
    }

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
    <Flex direction="column" gap={8}>
      <Flex align="center" gap={8}>
        {urgent ? (
          <Badge color="red">urgente</Badge>
        ) : (
          <>
            {type === 'info' && (
              <HiOutlineInformationCircle
                size={20}
                color={theme.colors.blue[11]}
              />
            )}
            {type === 'success' && (
              <HiOutlineCheckCircle size={20} color={theme.colors.green[11]} />
            )}
            {type === 'warning' && (
              <HiOutlineExclamation size={20} color={theme.colors.amber[11]} />
            )}
            {type === 'danger' && (
              <HiOutlineShieldExclamation
                size={20}
                color={theme.colors.red[11]}
              />
            )}
          </>
        )}

        <ToastTitle>{title}</ToastTitle>
      </Flex>

      <ToastText>{text}</ToastText>

      {!!actions?.length && (
        <Flex gap={8} justify="flex-end">
          {actions?.map((action) => (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              colorScheme={buttonColorScheme()}
              onClick={async () => {
                // TODO: ver o que fazer
                // if (action.backend) {
                //   try {
                //     setLoading(true);
                //     await api.post(action.action);
                //     toast.success('Ação executada com sucesso.', {
                //       autoClose: false,
                //     });
                //   } finally {
                //     setLoading(false);
                //   }
                // } else if (action.action.includes('http')) {
                //   window.open(action.action);
                // } else {
                //   history.push(action.action);
                // }
              }}
            >
              {action.label}
            </Button>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

type ToastData = {
  title: string;
  text: string;
  options?: ToastOptions;
};

export const toast = {
  info({ title, text, options }: ToastData): void {
    reactToast.info(
      <RenderIconTitleAndText type="info" title={title} text={text} />,
      options,
    );
  },
  success({ title, text, options }: ToastData): void {
    reactToast.success(
      <RenderIconTitleAndText type="success" title={title} text={text} />,
      options,
    );
  },
  warning({ title, text, options }: ToastData): void {
    reactToast.warning(
      <RenderIconTitleAndText type="warning" title={title} text={text} />,
      options,
    );
  },
  danger({ title, text, options }: ToastData): void {
    reactToast.error(
      <RenderIconTitleAndText type="danger" title={title} text={text} />,
      options,
    );
  },
  custom(data: CustomToastData): void {
    reactToast(
      <RenderIconTitleAndText
        type={
          data.type === 'ERROR' ? 'danger' : (data.type.toLowerCase() as Type)
        }
        title={data.title}
        text={data.message}
        urgent={data.urgent}
        actions={data.actions}
      />,
      {
        type: data.type.toLowerCase() as any,
        autoClose: data.timeout === 0 ? false : data.timeout,
      },
    );
  },
};
