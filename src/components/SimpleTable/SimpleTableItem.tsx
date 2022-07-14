import { ReactNode } from 'react';

import { useTheme } from 'styled-components';

import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Popover } from '../Popover';
import { Text } from '../Text';
import { ItemContainer } from './styles';

type SimpleTableItemProps = {
  children?: ReactNode;
  isHeader?: boolean;
  required?: boolean;
  isEnum?: boolean;
};

export function SimpleTableItem({
  children,
  isHeader,
  required,
  isEnum,
}: SimpleTableItemProps): JSX.Element {
  const theme = useTheme();

  return (
    <ItemContainer>
      <Text size="sm" lowContrast={isHeader}>
        {isEnum && (
          <Flex gap={4} align="center">
            <Text size="sm">enum</Text>

            <Popover>
              <IconButton
                type="button"
                icon="HiInformationCircle"
                colorScheme="gray"
                variant="ghost"
              />

              <Flex padding={12} maxWidth={440}>
                <Text size="sm" align="center">
                  {children}
                </Text>
              </Flex>
            </Popover>
          </Flex>
        )}

        {!isEnum && children}

        {!isEnum && !children && '--'}

        {required && <span style={{ color: theme.colors.red[9] }}> *</span>}
      </Text>
    </ItemContainer>
  );
}
