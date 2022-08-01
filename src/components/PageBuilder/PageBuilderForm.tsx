import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import * as Yup from 'yup';

import { getValidationErrors } from '../../helpers/getValidationErrors';
import { insertVariablesInHref } from '../../helpers/insertVariablesInHref';
import { MaskType } from '../../helpers/masks';
import { useLoading } from '../../hooks/loading';
import { Button } from '../Button';
import { Card } from '../Card';
import { Footer } from '../Footer';
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
import { Grid } from '../Grid';
import { Text } from '../Text';
import {
  ChangeParentData,
  ConfigType,
  FormFieldType,
  OptionType,
} from './stores/pageBuilder';

interface RenderSelectProps {
  field: FormFieldType;
  agent: AxiosInstance;
  disabled: boolean;
  changeParent: (changeParent: ChangeParentData) => void;
  parents: { [key: string]: string | number };
}

function RenderSelect({
  field,
  agent,
  disabled,
  changeParent,
  parents,
}: RenderSelectProps): JSX.Element {
  if (!field.options?.length && !field.href) {
    return <Text>Imcomplete data for select</Text>;
  }

  const { data, refetch } = useQuery(
    [field.href],
    async () => {
      const response = await agent.get(
        field.parent
          ? insertVariablesInHref(field.href ?? '', parents)
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

  useEffect(() => {
    if (parents[field.parent ?? '']) {
      refetch();
    }
  }, [parents, refetch, field.parent]);

  return (
    <Select
      name={field.name}
      label={field.label}
      placeholder={field.label}
      options={field?.options ?? (data as OptionType[])}
      disabled={disabled}
      onChange={(value) => {
        changeParent({
          parent: field.name,
          value: value as string | number,
        });
      }}
    />
  );
}

interface PageBuilderProps {
  config: ConfigType;
  agent: AxiosInstance;
  onSubmit: (route?: string) => void;
}

type HandleSubmitData = { [key: string]: string };

export function PageBuilderForm({
  config,
  agent,
  onSubmit,
}: PageBuilderProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const { setLoading } = useLoading();

  const [parents, setParents] = useState<{ [key: string]: string | number }>(
    {},
  );
  const [fieldsValue, setFieldsValue] = useState<{
    [key: string]: string | number;
  }>({});

  function changeParent({ parent, value }: ChangeParentData): void {
    setParents((prevState) => ({ ...prevState, [parent]: value }));
  }

  async function handleSubmit(
    handleSubmitData: HandleSubmitData,
  ): Promise<void> {
    try {
      formRef.current?.setErrors({});

      const shape = {} as any;

      config?.form.fields.forEach((field) => {
        if (field.required) {
          shape[field.name] = Yup.string().required('Campo obrigatório');
        }
      });

      const schema = Yup.object().shape(shape);

      await schema.validate(handleSubmitData, {
        abortEarly: false,
      });

      setLoading(true);

      const route = config?.form.actions.find(
        (button) => button.type === 'submit',
      )?.route;

      if (route) {
        await agent({
          method: route.method,
          url: route.url,
          data: handleSubmitData,
        });

        onSubmit();
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fieldVerification(field: FormFieldType): Promise<void> {
    try {
      setLoading(true);

      const formData = formRef.current?.getData();

      if (formData === undefined) {
        return;
      }

      const response = await agent({
        method: field.verification?.method,
        url: insertVariablesInHref(field.verification?.url ?? '', formData),
      });

      if (Object.keys(response.data).length) {
        setFieldsValue((prevState) => ({ ...prevState, ...response.data }));

        Object.entries(response.data).forEach(([key, itemValue]) => {
          formRef.current?.setFieldValue(key, itemValue);
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card flex direction="column" margin>
      <Form ref={formRef} onSubmit={handleSubmit} flex direction="column">
        <Grid columns={3} margin="0 0 auto" gap={8} padding>
          {config.form.fields.map((field) => {
            const disabled = !!field.parent && !parents[field.parent];
            const isReadOnly = useMemo(() => {
              if (field.readOnly === 'always') {
                return true;
              }

              if (field.readOnly === 'ifnotnull') {
                const fieldValue =
                  fieldsValue[field.name] ||
                  formRef.current?.getFieldValue(field.name);

                if (fieldValue) {
                  return true;
                }
              }

              return false;
            }, [field.readOnly, field.name, fieldsValue]);

            if (field.type === 'number') {
              return (
                <NumberInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled || isReadOnly}
                />
              );
            }

            if (field.type === 'mask') {
              return (
                <MaskInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  mask={field.mask as MaskType}
                  disabled={disabled || isReadOnly}
                  onBlur={(event) => {
                    if (event.target.value && field.verification?.url) {
                      fieldVerification(field);
                    }
                  }}
                />
              );
            }

            if (field.type === 'money') {
              return (
                <MoneyInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled || isReadOnly}
                />
              );
            }

            if (field.type === 'phone') {
              return (
                <PhoneInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled || isReadOnly}
                />
              );
            }

            if (field.type === 'percentage') {
              return (
                <PercentageInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled || isReadOnly}
                />
              );
            }

            if (field.type === 'switch') {
              return (
                <Switch
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  disabled={disabled || isReadOnly}
                  direction="vertical"
                />
              );
            }

            if (field.type === 'date') {
              return (
                <DatePicker
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.label}
                  disabled={disabled || isReadOnly}
                />
              );
            }

            if (field.type === 'select') {
              return (
                <RenderSelect
                  key={field.name}
                  field={field}
                  agent={agent}
                  disabled={disabled || isReadOnly}
                  changeParent={changeParent}
                  parents={parents}
                />
              );
            }

            return (
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.label}
                disabled={disabled || isReadOnly}
              />
            );
          })}
        </Grid>

        <Footer>
          {config.form.actions.map((action) => (
            <Button type={action.type}>{action.label}</Button>
          ))}
        </Footer>
      </Form>
    </Card>
  );
}
