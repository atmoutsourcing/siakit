import { useEffect, useState } from 'react';

import { useField } from '@unform/core';
import { useTheme as useStyledTheme } from 'styled-components';

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
  menuPlacement?: 'top' | 'bottom' | 'auto';
  onChange: (options: Option[]) => void;
}
type SelectProps = JSX.IntrinsicElements['input'] & Props;

export function SelectMulti({
  name,
  label,
  disabled,
  options,
  placeholder,
  returnType = 'key',
  menuPlacement = 'auto',
  onChange,
}: SelectProps): JSX.Element {
  const { colorScheme } = useTheme();
  const { colors, shadows } = useStyledTheme();

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

          if (onChange) {
            onChange(option as Option[]);
          }
        }}
        isClearable
        isMulti
        isDisabled={disabled}
        menuPlacement={menuPlacement}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9900,
            pointerEvents: 'auto',
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: 8,
            backgroundColor: colors.cardBackground,
            boxShadow: shadows.sm,
            border: `1px solid ${colors.gray[3]}`,
            padding: '8px 0',
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
          }),
          option: (base, state) => ({
            ...base,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',

            fontSize: '14px',
            color: colors.gray[12],

            cursor: 'pointer',

            transition: 'all 0.1s',

            '&:hover': {
              backgroundColor: colors[colorScheme][4],
            },

            backgroundColor: state.isSelected
              ? colors[colorScheme][6]
              : state.isFocused
              ? colors[colorScheme][3]
              : colors.cardBackground,
          }),
        }}
        menuPortalTarget={document.body}
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
