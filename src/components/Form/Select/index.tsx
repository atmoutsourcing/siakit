import React, { useEffect, useState } from 'react';

import { useField } from '@unform/core';

import { useTheme } from '../../../hooks/theme';
import { InputContainer, Label, Error } from '../styles';
import { Container } from './styles';

type Option = {
  value: number | string;
  label: string;
};

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  returnType?: 'key' | 'option';
}
type SelectProps = JSX.IntrinsicElements['input'] & Props;

export function Select({
  name,
  label,
  disabled,
  options,
  placeholder,
  returnType = 'key',
}: SelectProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  );

  useEffect(() => {
    registerField<Option | string | number>({
      name: fieldName,
      getValue: () => {
        if (returnType === 'option') {
          return selected || '';
        }

        return selected?.value || '';
      },
      setValue: (_, value: Option | string | number) => {
        if (typeof value === 'object') {
          setSelected(value);

          return;
        }

        const findOption = options.find((option) => option.value === value);

        if (findOption) {
          setSelected(findOption);
        }
      },
      clearValue: () => {
        setSelected(null);
      },
    });
  }, [fieldName, registerField, selected, returnType]);

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Container
        options={options}
        classNamePrefix="react-select"
        placeholder={placeholder}
        colorScheme={colorScheme}
        isErrored={!!error}
        value={selected}
        onChange={(option) => {
          setSelected(option as Option);
        }}
        isClearable
        isDisabled={disabled}
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
