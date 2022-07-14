import { Button } from '../Button';

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent,
  number,
  onPageChange,
}: PaginationItemProps): JSX.Element {
  if (isCurrent) {
    return <Button type="button">{String(number)}</Button>;
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onPageChange(number)}
    >
      {String(number)}
    </Button>
  );
}
