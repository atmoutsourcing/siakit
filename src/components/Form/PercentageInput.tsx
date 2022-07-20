import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';

import { useTheme } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { InputContainer, Label, InputBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type PercentageInputProps = JSX.IntrinsicElements['input'] & Props;

export function PercentageInput({
  name,
  label,
  disabled,
  ...rest
}: PercentageInputProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  function handleChange(value: string): void {
    const valueWithoutDigit = value.replaceAll(/[^\d,]/g, '');

    let newValue = '0';

    const parsedValue = parseFloat(valueWithoutDigit.replace(',', '.'));

    if (parsedValue > 100) {
      newValue = '100';
    } else if (parsedValue < 0) {
      newValue = '0';
    } else {
      newValue = valueWithoutDigit;
    }

    if (inputRef.current) {
      inputRef.current.value = String(newValue);
    }

    setIsFilled(String(newValue));
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value: string) => {
        handleChange(value);
      },
      clearValue: (ref) => {
        ref.current.value = '';

        setIsFilled('');
      },
    });
  }, [fieldName, registerField]);

  function handleClear(): void {
    setIsFilled('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <InputBody
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        colorScheme={colorScheme}
        disabled={!!disabled}
      >
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={(event) => handleChange(event.target.value)}
          {...rest}
        />
        {isFilled && !disabled && (
          <IconButton
            type="button"
            icon="HiOutlineX"
            size="sm"
            variant="ghost"
            colorScheme="gray"
            onClick={handleClear}
            tabIndex={-1}
          />
        )}
      </InputBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
