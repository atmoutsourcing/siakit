import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { useTheme as useStyledTheme } from 'styled-components';

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
  onChange?: (value: string | number | null) => void;
  menuPlacement?: 'top' | 'bottom' | 'auto';
}
type SelectProps = JSX.IntrinsicElements['input'] & Props;

export function Select({
  name,
  label,
  disabled,
  options,
  placeholder,
  returnType = 'key',
  onChange,
  menuPlacement = 'auto',
}: SelectProps): JSX.Element {
  const { colorScheme } = useTheme();
  const { colors, shadows } = useStyledTheme();

  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  );

  useEffect(() => {
    registerField<Option | string | number>({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (returnType === 'option') {
          return ref.props.value || '';
        }

        return ref.props.value?.value || '';
      },
      setValue: (ref, value: Option | string | number) => {
        if (ref.props?.options) {
          if (typeof value === 'object') {
            setSelected(value);

            if (onChange) {
              onChange(value.value);
            }

            return;
          }

          const findOption = ref.props?.options.find(
            (option: Option) => option.value === value,
          );

          if (onChange && findOption) {
            onChange(findOption.value);
          }

          if (findOption) {
            setSelected(findOption);
          }
        }
      },
      clearValue: () => {
        setSelected(null);
      },
    });
  }, [fieldName, registerField, selected, returnType, options]);

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Container
        ref={selectRef}
        options={options}
        classNamePrefix="react-select"
        placeholder={placeholder}
        colorScheme={colorScheme}
        isErrored={!!error}
        value={selected}
        onChange={(option) => {
          setSelected(option as Option);

          if (onChange) {
            onChange((option as Option)?.value);
          }
        }}
        isClearable
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
