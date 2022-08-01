import { useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { insertVariablesInHref } from '../../helpers/insertVariablesInHref';
import { MaskType } from '../../helpers/masks';
import { Button } from '../Button';
import { Card } from '../Card';
import { Flex } from '../Flex';
import { Footer, FooterLeft } from '../Footer';
import {
  DatePicker,
  Form,
  FormHandles,
  Input,
  MaskInput,
  MoneyInput,
  NumberInput,
  PercentageInput,
  PhoneInput,
  Select,
  Switch,
} from '../Form';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import {
  FieldType,
  OptionType,
  usePageBuilderStore,
} from './stores/pageBuilder';

interface RenderSelectProps {
  field: FieldType;
  agent: AxiosInstance;
  disabled: boolean;
}

function RenderSelect({
  field,
  agent,
  disabled,
}: RenderSelectProps): JSX.Element {
  const { changeParent, filterParents } = usePageBuilderStore((state) => ({
    changeParent: state.changeParent,
    filterParents: state.filterParents,
  }));

  if (!field.options?.length && !field.href) {
    return <Text>Imcomplete data for select</Text>;
  }

  const { data } = useQuery(
    [field.href],
    async () => {
      const response = await agent.get(
        field.parent
          ? insertVariablesInHref(field.href ?? '', filterParents)
          : field.href ?? '',
      );

      return response.data;
    },
    {
      placeholderData: [],
      enabled: !field.options?.length && !!field.href && !disabled,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  );

  return (
    <Select
      name={field.dataIndex}
      label={field.label}
      placeholder={field.label}
      options={field?.options ?? (data as OptionType[])}
      disabled={disabled}
      onChange={(value) => {
        changeParent({
          parent: field.dataIndex,
          value: value as string | number,
        });
      }}
    />
  );
}

interface FiltersProps {
  agent: AxiosInstance;
}

interface HandleSubmitData {
  [key: string]: string;
}

export function Filters({ agent }: FiltersProps): JSX.Element {
  const filtersFormRef = useRef<FormHandles>(null);

  const {
    config,
    toggleFiltersVisibility,
    filters,
    setFilters,
    filterParents,
  } = usePageBuilderStore((state) => ({
    config: state.config,
    toggleFiltersVisibility: state.toggleFiltersVisibility,
    filters: state.filters,
    setFilters: state.setFilters,
    filterParents: state.filterParents,
  }));

  function handleSubmit(data: HandleSubmitData): void {
    setFilters(data);
  }

  useEffect(() => {
    if (filtersFormRef.current && !!Object.keys(filters).length) {
      filtersFormRef.current?.setData(filters);
    }
  }, [filters]);

  if (!config) {
    return <Text>No config data</Text>;
  }

  return (
    <Card width={320} direction="column">
      <Flex align="center" justify="space-between" padding={8}>
        <Flex padding={8}>
          <Heading size="md">Filtros</Heading>
        </Flex>

        <IconButton
          type="button"
          icon="FiX"
          variant="ghost"
          colorScheme="gray"
          onClick={toggleFiltersVisibility}
        />
      </Flex>

      <Form
        ref={filtersFormRef}
        onSubmit={handleSubmit}
        direction="column"
        flex
        justify="space-between"
      >
        <Flex direction="column" padding gap={8}>
          {config.filter.fields.map((field) => {
            const disabled = !!field.parent && !filterParents[field.parent];

            if (field.type === 'number') {
              return (
                <NumberInput
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'mask') {
              return (
                <MaskInput
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  mask={field.mask as MaskType}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'money') {
              return (
                <MoneyInput
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'phone') {
              return (
                <PhoneInput
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'percentage') {
              return (
                <PercentageInput
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'switch') {
              return (
                <Switch
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'date') {
              return (
                <DatePicker
                  key={field.dataIndex}
                  name={field.dataIndex}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled}
                />
              );
            }

            if (field.type === 'select') {
              return (
                <RenderSelect
                  key={field.dataIndex}
                  field={field}
                  agent={agent}
                  disabled={disabled}
                />
              );
            }

            return (
              <Input
                key={field.dataIndex}
                name={field.dataIndex}
                label={field.label}
                placeholder={field.label}
                disabled={disabled}
              />
            );
          })}
        </Flex>
        <Footer>
          <FooterLeft>
            <Button
              type="button"
              variant="secondary"
              colorScheme="gray"
              onClick={() => filtersFormRef.current?.reset()}
            >
              Limpar filtros
            </Button>
          </FooterLeft>

          <Button type="submit">Buscar</Button>
        </Footer>
      </Form>
    </Card>
  );
}
