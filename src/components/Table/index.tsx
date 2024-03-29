import { ReactNode, useEffect, useRef } from 'react';

import dot from 'dot-object';
import { MdMoreHoriz } from 'react-icons/md';

import { Colors } from '../../hooks/theme';
import { Badge } from '../Badge';
import { Dropdown, DropdownContent, DropdownItem } from '../Dropdown';
import { Empty } from '../Empty';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { LinkButton } from '../LinkButton';
import { Pagination } from '../Pagination';
import { Ellipse, Rectangle } from '../Shimmer';
import { HeaderCell } from './HeaderCell';
import { Container, BodyCell, ActionCell, FooterCell } from './styles';

type RenderType = {
  value: string | { [key: string]: string };
  item:
    | { [key: string]: string }
    | { [key: string]: { [key: string]: string } };
};

type HeaderType = {
  label: string;
  dataIndex: string;
  sort?: string | null;
  visible?: boolean;
  render?: (data: RenderType) => ReactNode;
  align?: 'left' | 'right';
};

type ActionType = {
  label: string;
  type?: string;
  onClick: (
    item:
      | { [key: string]: string }
      | { [key: string]: { [key: string]: string } },
  ) => void;
};

type SortType = {
  direction: string;
  dataIndex: string;
};

interface TableProps {
  headers: HeaderType[];
  data: { [key: string]: any }[] | { [key: string]: { [key: string]: any } }[];
  footer?: { [key: string]: string };
  actions?: ActionType[];

  totalCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  perPage?: number;
  perPageChange?: (amount: number) => void;

  sort?: SortType;
  onSort?: (sort: SortType) => void;

  exports?: () => void;

  isLoading?: boolean;
}

export function Table({
  headers = [],
  data = [],
  footer,
  actions = [],

  totalCount,
  currentPage,
  onPageChange,
  perPage = 20,
  perPageChange,

  sort,
  onSort,

  exports,

  isLoading,
}: TableProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const hasPagination =
    !!data.length &&
    currentPage !== undefined &&
    totalCount !== undefined &&
    onPageChange !== undefined;

  return (
    <Flex flex gap direction="column" overflow>
      <Container
        ref={containerRef}
        cols={
          headers.filter((item) => item.visible !== false).length &&
          actions.length
            ? headers.filter((item) => item.visible !== false).length + 1
            : headers.filter((item) => item.visible !== false).length
        }
        haveActions={!!actions.length}
      >
        <div>
          {headers
            .filter((item) => item.visible !== false)
            .map((field) => (
              <HeaderCell
                key={field.dataIndex}
                dataIndex={field.dataIndex}
                isSort={!!field.sort}
                sort={
                  sort?.dataIndex === field.dataIndex
                    ? sort
                    : {
                        dataIndex: field.dataIndex,
                        direction: '',
                      }
                }
                onSort={onSort}
                align={field.align}
              >
                {field.label}
              </HeaderCell>
            ))}

          {!!actions.length && <HeaderCell isAction>Ações</HeaderCell>}

          {!isLoading &&
            !!data.length &&
            data.map((item) => (
              <>
                {headers
                  .filter((headerItem) => headerItem.visible !== false)
                  .map((field) => {
                    if (dot.pick(field.dataIndex, item) === null) {
                      return <BodyCell />;
                    }

                    if (dot.pick(field.dataIndex, item) && field.render) {
                      return (
                        <BodyCell align={field.align}>
                          {field.render({
                            value: dot.pick(field.dataIndex, item),
                            item,
                          })}
                        </BodyCell>
                      );
                    }

                    if (
                      typeof dot.pick(field.dataIndex, item) === 'number' &&
                      field.render
                    ) {
                      return (
                        <BodyCell align={field.align}>
                          {field.render({
                            value: dot.pick(field.dataIndex, item),
                            item,
                          })}
                        </BodyCell>
                      );
                    }

                    if (
                      typeof dot.pick(field.dataIndex, item) === 'boolean' &&
                      field.render
                    ) {
                      return (
                        <BodyCell align={field.align}>
                          {field.render({
                            value: dot.pick(field.dataIndex, item),
                            item,
                          })}
                        </BodyCell>
                      );
                    }

                    if (typeof dot.pick(field.dataIndex, item) === 'object') {
                      const { type, value } = dot.pick(
                        field.dataIndex,
                        item,
                      ) as {
                        [key: string]: string;
                      };

                      if (type === 'BADGE') {
                        const { color } = dot.pick(field.dataIndex, item) as {
                          [key: string]: string;
                        };

                        return (
                          <BodyCell align={field.align}>
                            <Badge color={color.toLowerCase() as Colors}>
                              {value}
                            </Badge>
                          </BodyCell>
                        );
                      }

                      if (type === 'URL') {
                        const { label } = dot.pick(field.dataIndex, item) as {
                          [key: string]: string;
                        };

                        return (
                          <BodyCell align={field.align}>
                            <LinkButton onClick={() => window.open(value)}>
                              {label}
                            </LinkButton>
                          </BodyCell>
                        );
                      }

                      if (type === 'ICCID') {
                        return (
                          <BodyCell align={field.align}>
                            <p>
                              {value.slice(0, 10)}
                              <span
                                style={{
                                  fontWeight: 'bold',
                                  color: 'var(--color-green)',
                                }}
                              >
                                {value.slice(10)}
                              </span>
                            </p>
                          </BodyCell>
                        );
                      }

                      if (type === 'IMEI') {
                        return (
                          <BodyCell align={field.align}>
                            <p>
                              {value.slice(0, 9)}
                              <span
                                style={{
                                  fontWeight: 'bold',
                                  color: 'var(--color-red)',
                                }}
                              >
                                {value.slice(9)}
                              </span>
                            </p>
                          </BodyCell>
                        );
                      }

                      return (
                        <BodyCell align={field.align}>
                          {JSON.stringify(dot.pick(field.dataIndex, item))}
                        </BodyCell>
                      );
                    }

                    if (field.dataIndex) {
                      return (
                        <BodyCell align={field.align}>
                          {dot.pick(field.dataIndex, item)}
                        </BodyCell>
                      );
                    }

                    return <BodyCell />;
                  })}

                {!!actions.length && (
                  <ActionCell>
                    <Dropdown>
                      <IconButton
                        type="button"
                        variant="ghost"
                        colorScheme="gray"
                        icon={<MdMoreHoriz />}
                      />

                      <DropdownContent>
                        {actions.map((action) => (
                          <DropdownItem
                            key={action.label}
                            onClick={() => action.onClick(item)}
                            type={action.type as any}
                          >
                            {action.label}
                          </DropdownItem>
                        ))}
                      </DropdownContent>
                    </Dropdown>
                  </ActionCell>
                )}
              </>
            ))}

          {footer &&
            headers.map(
              (header) =>
                header.dataIndex && (
                  <FooterCell
                    key={header.dataIndex}
                    align={header.align ?? 'left'}
                  >
                    {footer[header.dataIndex]}
                  </FooterCell>
                ),
            )}

          {footer && actions.length && <FooterCell isAction align="left" />}
        </div>
      </Container>

      {isLoading && (
        <Flex flex direction="column" gap={8}>
          {new Array(5).fill('').map(() => (
            <Flex gap={8}>
              <Ellipse width={40} />
              <Rectangle height={40} width="30%" />
              <Rectangle height={40} />
            </Flex>
          ))}
        </Flex>
      )}

      {!data.length && !isLoading && (
        <Empty
          title="Nenhum dado encontrado"
          description="Adicione um filtro e tente novamente."
        />
      )}

      {(hasPagination || !!exports) && (
        <Flex gap>
          <>
            {!!exports && exports()}

            {hasPagination && (
              <Pagination
                totalCount={totalCount}
                currentPage={currentPage}
                onPageChange={(value) => {
                  onPageChange(value);

                  if (containerRef.current) {
                    containerRef.current.scrollTo(0, 0);
                  }
                }}
                perPage={perPage}
                perPageChange={(value) => {
                  if (perPageChange) {
                    perPageChange(value);
                  }

                  if (containerRef.current) {
                    containerRef.current.scrollTo(0, 0);
                  }
                }}
              />
            )}
          </>
        </Flex>
      )}
    </Flex>
  );
}
