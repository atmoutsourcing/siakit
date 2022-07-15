import { useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';

import { useTheme } from '../../../hooks/theme';
import { InputContainer, Label, Error } from '../styles';
import { Container } from './styles';

interface Props {
  name: string;
  label?: string;
  amount?: number;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Pin({
  name,
  label,
  disabled,
  onBlur,
  onChange,
  amount = 4,
  ...rest
}: InputProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRefs = useRef<HTMLInputElement[]>([]);

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

  function handleChange(
    event?: React.ChangeEvent<HTMLInputElement> | null,
    data?: string,
  ): void {
    const value = data ?? event?.target.value;

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
      getValue: () => {
        let value = '';

        if (inputRefs.current.length) {
          inputRefs.current.forEach((ref) => {
            value = `${value}${ref.value}`;
          });
        }

        return value;
      },
      setValue: (_, value: string) => {
        if (inputRefs.current.length) {
          inputRefs.current.forEach((ref, index) => {
            if (value[index]) {
              ref.value = value[index];
            }
          });
        }
      },
      clearValue: () => {
        if (inputRefs.current.length) {
          inputRefs.current.forEach((ref) => {
            ref.value = '';
          });
        }

        setIsFilled('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Container
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        colorScheme={colorScheme}
        disabled={!!disabled}
      >
        {new Array(amount).fill('').map((_, index) => (
          <input
            ref={(ref) => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            type="text"
            maxLength={1}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && inputRefs.current[index - 1]) {
                const { value } = inputRefs.current[index];

                if (!value) {
                  inputRefs.current[index - 1].focus();
                }
              }
            }}
            onBlur={handleBlur}
            onChange={(event) => {
              handleChange(event);

              const { value } = event.target;

              const valueWithoutDigit = value.replaceAll(/\D/g, '');

              inputRefs.current[index].value = valueWithoutDigit;

              if (!!valueWithoutDigit && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
              }
            }}
            disabled={disabled}
            {...rest}
          />
        ))}
      </Container>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
