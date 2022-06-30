import React from 'react';

import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { PaginationItem } from './PaginationItem';
import { Container } from './styles';

type PaginationProps = {
  totalCount: number;

  currentPage: number;
  onPageChange: (page: number) => void;

  perPage: number;
  perPageChange: (amount: number) => void;
};

const siblingsCount = 1;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCount,
  currentPage,
  onPageChange,
  perPage,
  perPageChange,
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(totalCount / perPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <Container>
      <Flex>
        <Text size="sm">
          <strong>{(currentPage - 1) * perPage}</strong> -{' '}
          <strong>
            {totalCount < currentPage * perPage
              ? totalCount
              : currentPage * perPage}
          </strong>{' '}
          de <strong>{totalCount}</strong>
        </Text>
      </Flex>
      <Flex gap={8} align="center">
        <Heading size="xs">TODO: per page select</Heading>

        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />

            {currentPage > 2 + siblingsCount && (
              <IconButton
                type="button"
                icon="HiOutlineDotsHorizontal"
                variant="ghost"
                disabled
                colorScheme="gray"
              />
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        <PaginationItem
          isCurrent
          number={currentPage}
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              key={page}
              number={page}
              onPageChange={onPageChange}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <IconButton
                type="button"
                icon="HiOutlineDotsHorizontal"
                variant="ghost"
                disabled
                colorScheme="gray"
              />
            )}

            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Flex>
    </Container>
  );
}
