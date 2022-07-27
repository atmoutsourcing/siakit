import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { toPattern } from 'vanilla-masker';

import { useTheme } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { InputContainer, Label, InputBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type PhoneInputProps = JSX.IntrinsicElements['input'] & Props;

export function PhoneInput({
  name,
  label,
  disabled,
  ...rest
}: PhoneInputProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  function handleChange(value: string): void {
    let masked = '';

    if (value.length > 14) {
      masked = toPattern(value, '(99) 99999-9999');
    } else {
      masked = toPattern(value, '(99) 9999-9999');
    }

    if (inputRef.current) {
      inputRef.current.value = masked;
    }

    setIsFilled(masked);
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

        <IconButton
          type="button"
          icon="HiOutlineX"
          size="sm"
          variant="ghost"
          colorScheme="gray"
          onClick={handleClear}
          tabIndex={-1}
          visible={isFilled && !disabled}
        />
      </InputBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
