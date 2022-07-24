import { ReactNode, useEffect, useState } from 'react';

import { useField } from '@unform/core';

import { Colors, colors, useTheme } from '../../hooks/theme';
import { Container } from './Select/styles';
import { Label, Error, ColorView, InputContainer } from './styles';

type Option = {
  value: string;
  label: string;
};

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  returnType?: 'key' | 'option';
}
type ColorPickerProps = JSX.IntrinsicElements['input'] & Props;

const options = Object.keys(colors).map((item) => ({
  value: item,
  label: item,
}));

export function ColorPicker({
  name,
  label,
  disabled,
  placeholder,
  returnType = 'key',
}: ColorPickerProps): JSX.Element {
  const { colorScheme } = useTheme();

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const [selected, setSelected] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  );

  useEffect(() => {
    registerField<Option | string>({
      name: fieldName,
      getValue: () => {
        if (returnType === 'option') {
          return selected || '';
        }

        return selected?.value || '';
      },
      setValue: (_, value: Option | string) => {
        if (typeof value === 'object') {
          setSelected(value);

          return;
        }

        const findOption = options.find((option) => option.value === value);

        if (findOption) {
          setSelected(findOption);
        }
      },
      clearValue: () => {
        setSelected(null);
      },
    });
  }, [fieldName, registerField, selected]);

  function formatOptionLabel(data: unknown): ReactNode {
    const { value, label: optionLabel } = data as Option;

    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <ColorView color={value as Colors} />
        <span>{optionLabel}</span>
      </div>
    );
  }

  return (
    <InputContainer disabled={!!disabled}>
      {label && (
        <Label htmlFor={fieldName} isErrored={!!error}>
          {label}
        </Label>
      )}

      <Container
        options={options}
        classNamePrefix="react-select"
        placeholder={placeholder}
        colorScheme={colorScheme}
        isErrored={!!error}
        value={selected}
        onChange={(option) => setSelected(option as Option)}
        isClearable
        formatOptionLabel={formatOptionLabel}
        isDisabled={disabled}
      />

      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}
