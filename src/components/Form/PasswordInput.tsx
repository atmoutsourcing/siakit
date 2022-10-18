import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { HiEye, HiEyeOff, HiOutlineX } from 'react-icons/hi';

import { useTheme } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import {
  InputContainer,
  Label,
  InputBody,
  Error,
  StrenghtBar,
  StrenghtBarContainer,
} from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  strength?: number;
}
type PasswordInputProps = JSX.IntrinsicElements['input'] & Props;

export function PasswordInput({
  name,
  label,
  disabled,
  strength,
  ...rest
}: PasswordInputProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isHidden, setIsHidden] = useState(true);
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
      setValue: (_, value: string) => {
        handleChange(String(value));
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
          type={isHidden ? 'password' : 'text'}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChange={(event) => handleChange(event.target.value)}
          {...rest}
          autoComplete="new-password"
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

        <IconButton
          type="button"
          icon={isHidden ? <HiEye /> : <HiEyeOff />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          onClick={() => setIsHidden((prevState) => !prevState)}
          tabIndex={-1}
          disabled={disabled}
        />
      </InputBody>

      {typeof strength === 'number' && (
        <StrenghtBarContainer gap={4} align="center" strength={strength}>
          <StrenghtBar />
          <StrenghtBar />
          <StrenghtBar />

          {strength > 0 && (
            <Text size="xs">
              {strength > 0 && strength <= 30 && 'Senha fraca'}
              {strength > 30 && strength < 70 && 'Senha média'}
              {strength >= 70 && 'Senha forte'}
            </Text>
          )}
        </StrenghtBarContainer>
      )}

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
