import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';

import { useTheme } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { TextAreaContainer, Label, TextAreaBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}
type TextAreaProps = JSX.IntrinsicElements['textarea'] & Props;

export function TextArea({
  name,
  label,
  disabled,
  rows = 5,
  ...rest
}: TextAreaProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  function handleChange(value: string): void {
    if (inputRef.current) {
      inputRef.current.value = value;
    }

    setIsFilled(value);
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
    <TextAreaContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <TextAreaBody
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        colorScheme={colorScheme}
        disabled={!!disabled}
      >
        <textarea
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={(event) => handleChange(event.target.value)}
          rows={rows}
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
      </TextAreaBody>

      {error && <Error>{error}</Error>}
    </TextAreaContainer>
  );
}
