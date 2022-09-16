import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { HiOutlineX } from 'react-icons/hi';

import { useTheme } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { InputContainer, Label, InputBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({
  name,
  label,
  disabled,
  onBlur,
  onFocus,
  onChange,
  ...rest
}: InputProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  function handleBlur(
    event?: React.FocusEvent<HTMLInputElement, Element>,
  ): void {
    setIsFocused(false);

    if (onBlur && event) {
      onBlur(event);
    }
  }

  function handleFocus(
    event?: React.FocusEvent<HTMLInputElement, Element>,
  ): void {
    setIsFocused(true);

    if (onFocus && event) {
      onFocus(event);
    }
  }

  function handleChange(
    event?: React.ChangeEvent<HTMLInputElement> | null,
    data?: string,
  ): void {
    const value = data ?? event?.target.value;

    if (inputRef.current) {
      inputRef.current.value = value ?? '';
    }

    setIsFilled(value);

    if (onChange && event) {
      onChange(event);
    }
  }

  useEffect(() => {
    if (disabled) {
      handleBlur();
    }
  }, [disabled]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (_, value: string) => {
        if (value !== undefined) {
          handleChange(null, String(value));
        }
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

    if (onChange) {
      onChange({
        target: {
          value: '',
        },
      } as ChangeEvent<HTMLInputElement>);
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={(event) => handleChange(event)}
          {...rest}
        />

        <IconButton
          type="button"
          icon={<HiOutlineX />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          onClick={handleClear}
          tabIndex={-1}
          visible={!!isFilled && !disabled}
        />
      </InputBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
