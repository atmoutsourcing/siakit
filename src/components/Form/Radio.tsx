import { useEffect, useState } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { useField } from '@unform/core';
import styled from 'styled-components';

import { Colors, useTheme } from '../../hooks/theme';
import { Flex } from '../Flex';
import { InputContainer, Label, CheckboxBody, Error } from './styles';

type Option = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  label?: string;
  direction?: 'row' | 'column';
  options: Option[];
}
type RadioProps = JSX.IntrinsicElements['input'] & Props;

type RadioGroupItemProps = {
  colorScheme: Colors;
};

const RadioGroupItem = styled(RadioGroup.Item)<RadioGroupItemProps>`
  all: unset;
  background-color: ${({ theme, checked, colorScheme }) =>
    checked ? theme.colors[colorScheme][9] : theme.colors.gray[4]};
  width: 20px;
  height: 20px;
  border-radius: 100%;

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {
    background-color: ${({ colorScheme, theme }) =>
      theme.colors[colorScheme][9]};
  }
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export function Radio({
  name,
  label,
  direction = 'column',
  disabled,
  options,
}: RadioProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const [selected, setSelected] = useState<string>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return selected;
      },
      setValue: (ref, value: string) => {
        setSelected(value);
      },
      clearValue: () => {
        setSelected('');
      },
    });
  }, [fieldName, registerField, selected]);

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <CheckboxBody isErrored={!!error} direction={direction}>
        <RadioGroup.Root
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          value={selected}
          onValueChange={setSelected}
        >
          {options.map((option) => (
            <Flex gap={8} align="center">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                colorScheme={colorScheme}
                disabled={disabled}
              >
                <RadioGroupIndicator />
              </RadioGroupItem>

              <label htmlFor={option.value} style={{ fontSize: 14 }}>
                {option.label}
              </label>
            </Flex>
          ))}
        </RadioGroup.Root>
      </CheckboxBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
