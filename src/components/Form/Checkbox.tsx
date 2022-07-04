import React, { useEffect, useRef, useState } from 'react';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useField } from '@unform/core';
import { GoCheck } from 'react-icons/go';
import styled from 'styled-components';

import { Colors, useTheme } from '../../hooks/theme';
import { InputContainer, Label, CheckboxBody, Error } from './styles';

type CheckboxContainerProps = {
  colorScheme: Colors;
};

const CheckboxContainer = styled(RadixCheckbox.Root)<CheckboxContainerProps>`
  all: unset;
  background-color: ${({ theme, checked, colorScheme }) =>
    checked ? theme.colors[colorScheme][9] : theme.colors.gray[4]};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {
    background-color: ${({ colorScheme, theme }) =>
      theme.colors[colorScheme][9]};
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  color: ${({ theme }) => theme.colors.white};

  height: 16px;
`;

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
type CheckboxProps = JSX.IntrinsicElements['input'] & Props;

export function Checkbox({
  name,
  label,
  direction = 'column',
  disabled,
  options,
}: CheckboxProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue = [], registerField, error } = useField(name);

  const [selected, setSelected] = useState<string[]>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: () => {
        return selected;
      },
      setValue: (ref, value: string[]) => {
        setSelected(value);
      },
      clearValue: () => {
        setSelected([]);
      },
    });
  }, [fieldName, registerField, selected]);

  function handleSelect(option: Option): void {
    if (selected.includes(option.value)) {
      setSelected((prevState) =>
        prevState.filter((item) => item !== option.value),
      );
    } else {
      setSelected((prevState) => [...prevState, option.value]);
    }
  }

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <CheckboxBody isErrored={!!error} direction={direction}>
        {options.map((option) => (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <CheckboxContainer
              colorScheme={colorScheme}
              id={option.value}
              checked={selected.includes(option.value)}
              onCheckedChange={() => handleSelect(option)}
              disabled={disabled}
            >
              <CheckboxIndicator>
                <GoCheck />
              </CheckboxIndicator>
            </CheckboxContainer>

            <label htmlFor={option.value} style={{ fontSize: 14 }}>
              {option.label}
            </label>
          </div>
        ))}
      </CheckboxBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
