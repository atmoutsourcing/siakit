import { useEffect, useState } from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useField } from '@unform/core';
import styled from 'styled-components';

import { Colors, useTheme } from '../../hooks/theme';
import { InputContainer, SwitchBody, Error } from './styles';

type SwitchContainerProps = {
  colorScheme: Colors;
};

const SwitchContainer = styled(SwitchPrimitive.Root)<SwitchContainerProps>`
  all: unset;
  width: 44px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.gray[4]};
  border-radius: 9999px;
  position: relative;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {
    background-color: ${({ colorScheme, theme }) =>
      theme.colors[colorScheme][9]};
  }
`;

const SwitchThumb = styled(SwitchPrimitive.Thumb)`
  display: block;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 100ms;
  transform: translateX(4px);
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(24px);
  }
`;

const SwitchLabel = styled.label`
  font-size: 14px;

  color: ${({ theme }) => theme.colors.gray[12]};
`;

type SwitchProps = {
  name: string;
  label?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
};

export function Switch({
  name,
  label,
  disabled,
  value,
  onChange,
  direction = 'horizontal',
}: SwitchProps): JSX.Element {
  const { colorScheme } = useTheme();

  const {
    fieldName,
    defaultValue = false,
    registerField,
    error,
  } = useField(name);

  const [checked, setChecked] = useState<boolean>(
    typeof value === 'boolean' ? value : defaultValue,
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return checked;
      },
      setValue: (ref, data: boolean) => {
        setChecked(data);
      },
      clearValue: () => {
        setChecked(false);
      },
    });
  }, [fieldName, registerField, checked]);

  function handleChange(data: boolean): void {
    setChecked(data);

    if (onChange) {
      onChange(data);
    }
  }

  return (
    <InputContainer disabled={!!disabled}>
      <SwitchBody isVertical={direction === 'vertical'}>
        <SwitchContainer
          colorScheme={colorScheme}
          checked={checked}
          onCheckedChange={handleChange}
          id={name}
          disabled={disabled}
        >
          <SwitchThumb />
        </SwitchContainer>

        <SwitchLabel htmlFor={name}>{label}</SwitchLabel>
      </SwitchBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
