import { useEffect, useRef, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import { useField } from '@unform/core';
import { format, isValid } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { DayPicker } from 'react-day-picker';
import { HiCalendar, HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';
import { toPattern } from 'vanilla-masker';

import { useTheme, Colors } from '../../hooks/theme';
import { IconButton } from '../IconButton';
import { InputContainer, Label, InputBody, Error } from './styles';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}
type DatePickerProps = JSX.IntrinsicElements['input'] & Props;

type CardProps = {
  colorScheme: Colors;
};

const Card = styled(Popover.Content)<CardProps>`
  .rdp-day_selected:not([aria-disabled='true']) {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][9]};
  }

  .rdp-button:focus,
  .rdp-button:active {
    border-color: ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][3]};
  }

  .rdp-button:hover:not([aria-disabled='true']) {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][3]};
    color: ${({ theme, colorScheme }) => theme.colors[colorScheme][11]};
  }

  .rdp-day_selected:active:not([aria-disabled='true']) {
    color: ${({ theme, colorScheme }) => theme.colors[colorScheme][11]};
  }

  .rdp-day_selected:focus:not([aria-disabled='true']) {
    color: ${({ theme, colorScheme }) => theme.colors[colorScheme][11]};
  }

  .rdp-day_today {
    background-color: ${({ theme }) => theme.colors.orange[4]};
  }

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};

  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

export function DatePicker({
  name,
  label,
  disabled,
  ...rest
}: DatePickerProps): JSX.Element {
  const { colorScheme } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  const [selected, setSelected] = useState<Date>(defaultValue);
  const [monthSelected, setMonthSelect] = useState<Date>(defaultValue);

  const [open, setOpen] = useState(false);

  function handleChange(value: string): void {
    const masked = toPattern(value, '99/99/9999');

    if (inputRef.current) {
      inputRef.current.value = masked;
    }

    setIsFilled(masked);

    const [day, month, year] = masked.split('/');

    const newDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (isValid(newDate)) {
      setSelected(newDate);
      setMonthSelect(newDate);
    }
  }

  function handleSelect(value: Date | undefined): void {
    if (value) {
      setSelected(value);

      const formattedDate = format(value, 'dd/MM/yyyy');

      handleChange(formattedDate);

      setOpen(false);
    }
  }

  function handleClear(): void {
    setIsFilled('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    registerField<Date | undefined>({
      name: fieldName,
      getValue: () => selected,
      setValue: (_, value: Date | undefined) => {
        handleSelect(value);
      },
      clearValue: (ref) => {
        handleClear();
      },
    });
  }, [fieldName, registerField, selected]);

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
          defaultValue={defaultValue ? format(defaultValue, 'dd/MM/yyyy') : ''}
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
          icon={<HiOutlineX />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          onClick={handleClear}
          tabIndex={-1}
          visible={!!isFilled && !disabled}
        />

        <Popover.Root open={open} onOpenChange={setOpen}>
          <TriggerButton tabIndex={-1} disabled={disabled}>
            <HiCalendar size="16" />
          </TriggerButton>

          <Popover.Content asChild>
            <Card align="end" sideOffset={4} colorScheme={colorScheme}>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                month={monthSelected}
                onMonthChange={setMonthSelect}
                locale={ptBR}
              />
            </Card>
          </Popover.Content>
        </Popover.Root>
      </InputBody>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
