import { ReactNode, Fragment } from 'react';

type SimpleTableHeaderProps = {
  children: ReactNode;
};

export function SimpleTableHeader({
  children,
}: SimpleTableHeaderProps): JSX.Element {
  return <>{children}</>;
}
