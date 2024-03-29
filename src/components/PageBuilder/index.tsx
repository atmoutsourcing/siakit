import { useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FormHandles } from '@unform/core';
import { AxiosInstance } from 'axios';
import { MdDownload, MdFilterList } from 'react-icons/md';

import { insertVariablesInHref } from '../../helpers/insertVariablesInHref';
import { useLoading } from '../../hooks/loading';
import { Button } from '../Button';
import { Dropdown, DropdownContent, DropdownItem } from '../Dropdown';
import { Flex } from '../Flex';
import { Form, Input } from '../Form';
import { Spinner } from '../Spinner';
import { Table } from '../Table';
import { Filters } from './Filters';
import {
  ConfigType,
  ExportType,
  usePageBuilderStore,
} from './stores/pageBuilder';

interface PageBuilderProps {
  config: ConfigType;
  agent: AxiosInstance;
  onNavigate: (route: string | number) => void;
}

interface HandleSearchData {
  search: string;
}

export function PageBuilderPage({
  config,
  agent,
  onNavigate,
}: PageBuilderProps): JSX.Element {
  const searchFormRef = useRef<FormHandles>(null);

  const {
    setConfig,

    totalCount,
    setTotalCount,

    currentPage,
    setCurrentPage,

    perPage,
    setPerPage,

    filtersVisible,
    toggleFiltersVisibility,
    filters,
    setFilters,

    sort,
    setSort,
  } = usePageBuilderStore((state) => ({
    setConfig: state.setConfig,

    totalCount: state.totalCount,
    setTotalCount: state.setTotalCount,

    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,

    perPage: state.perPage,
    setPerPage: state.setPerPage,

    filtersVisible: state.filtersVisible,
    toggleFiltersVisibility: state.toggleFiltersVisibility,

    filters: state.filters,
    setFilters: state.setFilters,

    sort: state.sort,
    setSort: state.setSort,
  }));

  const { setLoading } = useLoading();

  const { data, isLoading, isFetching } = useQuery(
    [
      config.slug,
      {
        currentPage,
        perPage,
        filters,
        sort,
      },
    ],
    async () => {
      const response = await agent.get(config.list.url, {
        params: {
          _page: currentPage,
          _limit: perPage,
          filters,
          sort,
        },
      });

      setTotalCount(100);

      return response.data;
    },
  );

  useEffect(() => {
    document.title = config.label;

    setConfig(config);

    if (config.list.usePagination) {
      setPerPage(config.list.perPage ?? 20);
    }

    if (config.list.defaultSort?.dataIndex) {
      setSort(config.list.defaultSort);
    }
  }, [config, setConfig, setPerPage]);

  function renderExports(): JSX.Element {
    if (!config.exports?.length) {
      return <></>;
    }

    async function handleDownload(item: ExportType): Promise<void> {
      try {
        setLoading(true);

        await agent.get(item.url);
      } finally {
        setLoading(false);
      }
    }

    return (
      <Dropdown align="start">
        <Button type="button" icon={<MdDownload />} variant="secondary">
          Exportar
        </Button>

        <DropdownContent>
          {config.exports?.map((item) => (
            <DropdownItem onClick={() => handleDownload(item)}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }

  function handleSearch({ search }: HandleSearchData): void {
    setFilters({ search });
  }

  return (
    <Flex overflow>
      <Flex flex direction="column" padding gap overflow>
        <Flex flexWrap="wrap" justify="space-between" gap={8}>
          <Flex gap={8} align="center">
            {config?.actions?.map((action) => (
              <Button type="button" onClick={() => onNavigate(action.url)}>
                {action.label}
              </Button>
            ))}

            {!isLoading && isFetching && <Spinner />}
          </Flex>

          {!!config.filter && (
            <Flex gap flexWrap="wrap">
              {!!config.filter.fields.length && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={toggleFiltersVisibility}
                  icon={<MdFilterList />}
                >
                  Filtros
                </Button>
              )}

              {config.filter.hasSearch && (
                <Form
                  ref={searchFormRef}
                  onSubmit={handleSearch}
                  gap={8}
                  flexWrap="wrap"
                  initialData={filters}
                >
                  <Flex width={320}>
                    <Input
                      name="search"
                      placeholder="Informe um texto de pesquisa"
                    />
                  </Flex>
                  <Button type="submit">Buscar</Button>
                </Form>
              )}
            </Flex>
          )}
        </Flex>

        {!!config.list.fields.length && (
          <>
            <Table
              headers={config.list.fields}
              actions={config.list.actions?.map((action) => {
                const newItem = {
                  label: action.label,
                  type: action.type,

                  onClick: () => undefined,
                } as {
                  label: string;
                  type: string;
                  onClick: (
                    item:
                      | { [key: string]: string }
                      | { [key: string]: { [key: string]: string } },
                  ) => void;
                };

                if (action.action.type === 'redirect') {
                  newItem.onClick = (item) =>
                    onNavigate(insertVariablesInHref(action.action.url, item));
                }

                return newItem;
              })}
              footer={config.list.footer}
              data={data}
              totalCount={config.list.usePagination ? totalCount : undefined}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              perPage={perPage}
              perPageChange={(value) => setPerPage(value)}
              isLoading={isLoading}
              exports={renderExports}
              sort={sort}
              onSort={setSort}
            />
          </>
        )}
      </Flex>

      {filtersVisible && <Filters agent={agent} />}
    </Flex>
  );
}
