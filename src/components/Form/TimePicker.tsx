import { useEffect, useRef, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import { useField } from '@unform/core';
import { HiClock } from 'react-icons/hi';
import styled, { css } from 'styled-components';
import { toPattern } from 'vanilla-masker';

import { useTheme, Colors } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { InputContainer, Label, InputBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type TimePickerProps = JSX.IntrinsicElements['input'] & Props;

type CardProps = {
  colorScheme: Colors;
};

const Card = styled(Popover.Content)<CardProps>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};

  display: flex;

  max-height: 220px;
  overflow: auto;
`;

const TriggerButton = styled(Popover.Trigger)`
  background-color: transparent;
  border: 0;
  cursor: pointer;

  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray[9]};
`;

const List = styled.div`
  overflow: auto;
`;

type ItemProps = {
  colorScheme: Colors;
  selected: boolean;
};

const Item = styled.button<ItemProps>`
  all: unset;
  width: 48px;
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ selected, theme, colorScheme }) =>
    selected &&
    css`
      background-color: ${theme.colors[colorScheme][3]};
    `}

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][4]};
  }
`;

export function TimePicker({
  name,
  label,
  disabled,
  ...rest
}: TimePickerProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  function handleChange(value: string): void {
    const masked = toPattern(value, '99:99');

    if (inputRef.current) {
      inputRef.current.value = masked;
    }

    setIsFilled(masked);

    if (masked.length === 5) {
      const maskedSplitted = masked.split(':');

      setHour(maskedSplitted[0]);
      setMinute(maskedSplitted[1]);
    }
  }

  function handleClear(): void {
    setIsFilled('');
    setHour('');
    setMinute('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (_, value: string) => {
        handleChange(value);
      },
      clearValue: () => handleClear(),
    });
  }, [fieldName, registerField]);

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
          visible={!!isFilled && !disabled}
        />

        <Popover.Root>
          <TriggerButton tabIndex={-1} disabled={disabled}>
            <HiClock size="16" />
          </TriggerButton>

          <Popover.Content asChild>
            <Card align="end" sideOffset={4} colorScheme={colorScheme}>
              <List>
                {Array.from(Array(24).keys())
                  .map((item) => String(item).padStart(2, '0'))
                  .map((item) => (
                    <Item
                      type="button"
                      colorScheme={colorScheme}
                      selected={item === hour}
                      onClick={() => {
                        setHour(item);

                        if (inputRef.current) {
                          const selectedSplitted =
                            inputRef.current.value.split(':');

                          let value = '';

                          if (selectedSplitted.length === 1) {
                            value = `${item}:00`;
                          } else {
                            value = `${item}:${selectedSplitted[1]}`;
                          }

                          handleChange(value);
                        }
                      }}
                    >
                      {item}
                    </Item>
                  ))}
              </List>
              <List>
                {Array.from(Array(60).keys())
                  .map((item) => String(item).padStart(2, '0'))
                  .map((item) => (
                    <Item
                      type="button"
                      colorScheme={colorScheme}
                      selected={item === minute}
                      onClick={() => {
                        setMinute(item);

                        if (inputRef.current) {
                          const selectedSplitted =
                            inputRef.current.value.split(':');

                          let value = '';

                          if (selectedSplitted.length === 1) {
                            value = `00:${item}`;
                          } else {
                            value = `${selectedSplitted[0]}:${item}`;
                          }

                          handleChange(value);
                        }
                      }}
                    >
                      {item}
                    </Item>
                  ))}
              </List>
            </Card>
          </Popover.Content>
        </Popover.Root>
      </InputBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
