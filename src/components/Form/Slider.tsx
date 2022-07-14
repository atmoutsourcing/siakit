import { useEffect, useState } from 'react';

import * as RadixSlider from '@radix-ui/react-slider';
import { useField } from '@unform/core';
import styled from 'styled-components';

import { Colors, useTheme } from '../../hooks/theme';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Error, InputContainer, Label } from './styles';

const Container = styled(RadixSlider.Root)`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;

  &[data-orientation='horizontal'] {
    height: 16px;
  }
`;

const Track = styled(RadixSlider.Track)`
  background-color: ${({ theme }) => theme.colors.gray[4]};
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;

  &[data-orientation='horizontal'] {
    height: 8px;
  }
`;

type RangeProps = {
  colorsScheme: Colors;
};

const Range = styled(RadixSlider.Range)<RangeProps>`
  position: absolute;
  background-color: ${({ theme, colorsScheme }) =>
    theme.colors[colorsScheme][9]};
  border-radius: 9999px;
  height: 100%;
`;

const Thumb = styled(RadixSlider.Thumb)`
  all: unset;
  display: block;
  width: 16px;
  height: 16px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

interface Props {
  name: string;
  label?: string;
  min?: number;
  max?: number;
}
type SliderProps = JSX.IntrinsicElements['input'] & Props;

export function Slider({
  name,
  label,
  min = 0,
  max = 100,
  disabled,
}: SliderProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue = 0, registerField, error } = useField(name);

  const [value, setValue] = useState([defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return value[0];
      },
      setValue: (_, data: number) => {
        setValue([data]);
      },
      clearValue: () => {
        setValue([0]);
      },
    });
  }, [fieldName, registerField, value]);

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Flex align="center">
        <Container
          value={value}
          onValueChange={setValue}
          min={min}
          max={max}
          disabled={disabled}
        >
          <Track>
            <Range colorsScheme={colorScheme} />
          </Track>

          <Thumb />
        </Container>
        <Flex width={32} justify="flex-end">
          <Text>{value[0]}</Text>
        </Flex>
      </Flex>

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
