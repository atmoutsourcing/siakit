import React, { useEffect, useState } from 'react';

import { useField } from '@unform/core';

import { useTheme } from '../../../hooks/theme';
import { InputContainer, Label, Error } from '../styles';
import { Container } from './styles';

type Option = {
  value: string;
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

export function SelectMulti({
  name,
  label,
  disabled,
  options,
  placeholder,
  returnType = 'key',
}: SelectProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [selected, setSelected] = useState<Option[]>(defaultValue || []);

  useEffect(() => {
    registerField<Option[] | string[]>({
      name: fieldName,
      getValue: () => {
        if (returnType === 'option') {
          return selected || '';
        }

        return selected?.map((item) => item.value) || [];
      },
      setValue: (_, value: Option[] | string[]) => {
        if (typeof value[0] === 'object') {
          setSelected(value as Option[]);

          return;
        }

        const newSelected = [] as Option[];

        value.forEach((item) => {
          const findOption = options.find((option) => option.value === item);

          if (findOption) {
            newSelected.push(findOption);
          }
        });

        setSelected(newSelected);
      },
      clearValue: () => {
        setSelected([]);
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
          setSelected(option as Option[]);
        }}
        isClearable
        isMulti
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
