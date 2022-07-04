import React, { ReactNode, useEffect, useRef, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import { useField } from '@unform/core';
import { HiOutlineCheck, HiOutlineChevronDown } from 'react-icons/hi';
import styled from 'styled-components';

import { Colors, colors, useTheme } from '../../hooks/theme';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import { Container } from './Select/styles';
import {
  ColorContainer,
  Label,
  InputBody,
  Error,
  ColorView,
  ColorButton,
  ChevronButton,
  InputContainer,
} from './styles';

type Option = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  returnType?: 'key' | 'option';
}
type ColorProps = JSX.IntrinsicElements['input'] & Props;

const options = Object.keys(colors).map((item) => ({
  value: item,
  label: item,
}));

export function Color({
  name,
  label,
  disabled,
  placeholder,
  returnType = 'key',
}: ColorProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  );

  useEffect(() => {
    registerField<Option | string>({
      name: fieldName,
      getValue: () => {
        if (returnType === 'option') {
          return selected || '';
        }

        return selected?.value || '';
      },
      setValue: (_, value: Option | string) => {
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
  }, [fieldName, registerField, selected]);

  function formatOptionLabel(data: unknown): ReactNode {
    const { value, label: optionLabel } = data as Option;

    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <ColorView color={value as Colors} />
        <span>{optionLabel}</span>
      </div>
    );
  }

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
        onChange={(option) => setSelected(option as Option)}
        isClearable
        formatOptionLabel={formatOptionLabel}
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
