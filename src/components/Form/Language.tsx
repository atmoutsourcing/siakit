import React, { ReactNode, useEffect, useRef, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import { useField } from '@unform/core';
import { HiOutlineCheck, HiOutlineChevronDown } from 'react-icons/hi';
import styled from 'styled-components';

import brasilFlag from '../../assets/flags/brasil.png';
import espanhaFlag from '../../assets/flags/espanha.png';
import estadosunidosFlag from '../../assets/flags/estadosunidos.png';
import { useTheme } from '../../hooks/theme';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Container } from './Select/styles';
import {
  ColorContainer,
  Label,
  InputBody,
  Error,
  ChevronButton,
  LanguageItem,
  InputContainer,
} from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  returnType?: 'key' | 'option';
}

type LanguageProps = JSX.IntrinsicElements['input'] & Props;

type Option = {
  value: string;
  label: string;
  flag: string;
};

const Card = styled(Popover.Content)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};

  padding: 8px 0;

  display: flex;
  flex-direction: column;

  width: 240px;
  outline: unset;
`;

const options = [
  { label: 'Português do Brasil', value: 'pt_BR', flag: brasilFlag },
  { label: 'English, US', value: 'en_US', flag: estadosunidosFlag },
  { label: 'Español', value: 'es_ES', flag: espanhaFlag },
];

export function Language({
  name,
  label,
  disabled,
  placeholder,
  returnType = 'key',
}: LanguageProps): JSX.Element {
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
    const { label: optionLabel, flag } = data as Option;

    return (
      <LanguageItem style={{ display: 'flex', gap: 8 }}>
        <img src={flag} alt={`${optionLabel} flag`} />
        <p>{optionLabel}</p>
      </LanguageItem>
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
